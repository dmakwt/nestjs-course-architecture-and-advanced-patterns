import { DynamicModule, Logger, Module, Scope, Type } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { AcknowledgeAlarmCommandHandler } from './commands/acknowledge-alarm.command-handler';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { AlarmAcknowledgedEventHandler } from './event-handlers/alarm-acknowledged.event-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,

    {
      provide: Logger,
      scope: Scope.TRANSIENT,
      inject: [INQUIRER],
      useFactory: (parentClass: object) => new Logger(parentClass.constructor.name),
    },

    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,

    AlarmCreatedEventHandler,

    AcknowledgeAlarmCommandHandler,
    AlarmAcknowledgedEventHandler,
  ],
})
export class AlarmsModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}