import { Logger, Module, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from '../../core/core.constants';
import { MongoEventStore } from './event-store/mongo-event-store';
import { EventStorePublisher } from './event-store/publishers/event-store.publisher';
import { Event, EventSchema } from './event-store/schemas/event.schema';
import { EventSerializer } from './event-store/serializers/event.serializer';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [
    {
      provide: Logger,
      scope: Scope.TRANSIENT,
      inject: [INQUIRER],
      useFactory: (parentClass: object) => new Logger(parentClass.constructor.name),
    },

    EventSerializer,
    EventStorePublisher,
    MongoEventStore,
  ],
})
export class SharedInfrastructureModule {}