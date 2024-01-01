import { Injectable, Type } from '@nestjs/common';
import { AlarmCreatedEvent } from '../../../../alarms/domain/events/alarm-created.event';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';
import { Event } from '../schemas/event.schema';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }

  getEventClassByType(type: string) {
    // We'll show a more scalable approach later
    switch (type) {
      case AlarmCreatedEvent.name:
        return AlarmCreatedEvent;
    }

    throw new Error(`Event type "${type}" not supported`);
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}