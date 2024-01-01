import { EventClsRegistry } from '../infrastructure/event-store/event-cls.registry';

/**
 * Decorator used to register an event class within the event class registry for
 * later consumption.
 */
export const AutowiredEvent: ClassDecorator = (target: any) => {
  EventClsRegistry.add(target);
};
