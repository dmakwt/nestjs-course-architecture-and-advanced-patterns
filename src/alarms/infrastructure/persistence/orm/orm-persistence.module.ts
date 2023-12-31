import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmRepository } from '../../../application/ports/alarm.repository';
import { AlarmEntity } from './entities/alarm.entity';
import { OrmAlarmRepository } from './repositories/alarm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  providers: [
    {
      provide: AlarmRepository,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class OrmAlarmPersistenceModule {}