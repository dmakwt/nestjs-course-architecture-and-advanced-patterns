import { Module, Type } from '@nestjs/common';
import { InMemoryAlarmPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';
import { OrmAlarmPersistenceModule } from './persistence/orm/orm-persistence.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    let persistenceModule: Type | undefined;
    if (driver === 'orm') {
      persistenceModule = OrmAlarmPersistenceModule;
    } else if (driver === 'in-memory') {
      persistenceModule = InMemoryAlarmPersistenceModule;
    }

    if (!persistenceModule) {
      throw new Error(`Unknown driver ${driver}`);
    }

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}