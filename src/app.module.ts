import { Module } from '@nestjs/common';
import { AlarmsModule } from './alarms/application/alarms.module';

@Module({
  imports: [AlarmsModule]
})
export class AppModule {}
