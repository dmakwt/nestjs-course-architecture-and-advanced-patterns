import { Module } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from './alarms.controller';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService],
})
export class AlarmsModule {}
