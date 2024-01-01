import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { EMPTY, Observable, filter, first, map, mergeMap, race, timer } from 'rxjs';
import { AlarmAcknowledgedEvent } from '../../domain/events/alarm-acknowledged.event';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';
import { NotifyFacilitySupervisorCommand } from '../commands/notify-facility-supervisor.command';

@Injectable()
export class UnacknowledgedAlarmsSaga {
  @Inject()
  private readonly logger: Logger;

  @Saga()
  start = (events$: Observable<any>): Observable<ICommand> => {
    /**
     * A stream of alarm acknowledged events.
     */
    const alarmAcknowledgedEvents$ = events$.pipe(ofType(AlarmAcknowledgedEvent));

    /**
     * A stream of alarm created events.
     */
    const alarmCreatedEvents$ = events$.pipe(ofType(AlarmCreatedEvent));

    return alarmCreatedEvents$.pipe(
      // Wait for an alarm to be acknowledged or 10 seconds to pass
      mergeMap((alarmCreatedEvent) =>
        race(
          alarmAcknowledgedEvents$.pipe(
            filter(
              (alarmAcknowledgedEvent) =>
                alarmAcknowledgedEvent.alarmId === alarmCreatedEvent.alarm.id,
            ),
            first(),
            // If the alarm is acknowledged, we don't need to do anything
            // Just return an empty observable that never emits
            mergeMap(() => EMPTY),
          ),
          timer(15_000 /** 15s */).pipe(map(() => alarmCreatedEvent)),
        ),
      ),
      map((alarmCreatedEvent) => {
        this.logger.debug(
          `⚠️⚠️⚠️ Alarm "${alarmCreatedEvent.alarm.name}" not acknowledged in 15 seconds!`,
        );

        const facilityId = '12345'; // stub data since we don't have a proper command handler for this
        return new NotifyFacilitySupervisorCommand(facilityId, [alarmCreatedEvent.alarm.id]);
      }),
    );
  };
}
