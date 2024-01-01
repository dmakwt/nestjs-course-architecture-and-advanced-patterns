import { Injectable, Type } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { VersionedAggregateRoot } from '../domain/aggregate-root';
import { EventStore } from './ports/event-store';

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async rehydrate<T extends VersionedAggregateRoot>(
    aggregateId: string,
    AggregateCls: Type<T>,
  ): Promise<T> {
    const events = await this.eventStore.getEventsByStreamId(aggregateId);

    const AggregateClsWithDispatcher = this.eventPublisher.mergeClassContext(AggregateCls);
    const aggregate = new AggregateClsWithDispatcher(aggregateId);

    aggregate.loadFromHistory(events);
    return aggregate;
  }
}
