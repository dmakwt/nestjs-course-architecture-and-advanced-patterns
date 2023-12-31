import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmFactory],
})
export class AlarmsModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}