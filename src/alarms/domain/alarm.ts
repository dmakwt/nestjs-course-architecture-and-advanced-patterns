import { VersionedAggregateRoot } from '../../shared/domain/aggregate-root';
import { SerializedEventPayload } from '../../shared/domain/interfaces/serializable-event';
import { AlarmItem } from './alarm-item';
import { AlarmAcknowledgedEvent } from './events/alarm-acknowledged.event';
import { AlarmCreatedEvent } from './events/alarm-created.event';
import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm extends VersionedAggregateRoot {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged = false;
  public items = new Array<AlarmItem>();

  constructor(public id: string) {
    super();
  }

  acknowledge() {
    this.apply(new AlarmAcknowledgedEvent(this.id));
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }

  [`on${AlarmCreatedEvent.name}`](
    event: SerializedEventPayload<AlarmCreatedEvent>,
  ) {
    this.name = event.alarm.name;
    this.severity = new AlarmSeverity(event.alarm.severity);
    this.triggeredAt = new Date(event.alarm.triggeredAt);
    this.isAcknowledged = event.alarm.isAcknowledged;
    this.items = event.alarm.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );
  }

  [`on${AlarmAcknowledgedEvent.name}`](
    event: SerializedEventPayload<AlarmAcknowledgedEvent>,
  ) {
    if (this.isAcknowledged) {
      throw new Error('Alarm has already been acknowledged');
    }
    this.isAcknowledged = true;
  }
}