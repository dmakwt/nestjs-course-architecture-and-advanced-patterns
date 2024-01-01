import { AutowiredEvent } from '../../../shared/decorators/autowired-event.decorator';

@AutowiredEvent
export class AlarmAcknowledgedEvent {
  constructor(public readonly alarmId: string) {}
}