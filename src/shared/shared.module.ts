import { Module } from '@nestjs/common';
import { AggregateRehydrator } from './application/aggregate-rehydrator';
import { SharedInfrastructureModule } from './infrastructure/shared-infrastructure.module';

@Module({
  imports: [SharedInfrastructureModule],
  providers: [AggregateRehydrator],
  exports: [SharedInfrastructureModule, AggregateRehydrator],
})
export class SharedModule {}