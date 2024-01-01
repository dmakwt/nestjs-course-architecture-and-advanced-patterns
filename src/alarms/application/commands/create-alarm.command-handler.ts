import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { CreateAlarmCommand } from './create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand> {
  @Inject()
  private readonly logger: Logger;

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.debug(`Processing "CreateAlarmCommand": ${JSON.stringify(command)}`);
    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );

    this.eventPublisher.mergeObjectContext(alarm);
    alarm.commit();

    return alarm;
  }
}
