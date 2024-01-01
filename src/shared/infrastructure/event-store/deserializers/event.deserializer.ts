import { Injectable, Type } from '@nestjs/common';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';
import { EventClsRegistry } from '../event-cls.registry';
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
    const eventClass = EventClsRegistry.get(type);
    if (!eventClass) {
      throw new Error(`Event class "${type}" not registered with "@AutowiredEvent" decorator`);
    }
    return eventClass;
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}