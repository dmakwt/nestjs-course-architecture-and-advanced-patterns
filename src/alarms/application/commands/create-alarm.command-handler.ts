import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { AlarmRepository } from '../ports/alarm.repository';
import { CreateAlarmCommand } from './create-alarm.command';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  @Inject()
  private readonly logger: Logger;

  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.debug(
      `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
    );
    const alarm = this.alarmFactory.create(command.name, command.severity);
    const newAlarm = await this.alarmRepository.save(alarm);

    // This is not yet the best way to dispatch events.
    // Domain events should be dispatched from the aggregate root, inside the domain layer.
    // We'll cover this in the upcoming lessons.
    this.eventBus.publish(new AlarmCreatedEvent(alarm));
    return newAlarm;
  }
}