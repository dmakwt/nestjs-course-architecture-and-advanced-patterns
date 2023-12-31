import { Inject, Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "../../domain/events/alarm-created.event";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<AlarmCreatedEvent>
{
  @Inject()
  private readonly logger: Logger;

  handle(event: AlarmCreatedEvent) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);
  }
}