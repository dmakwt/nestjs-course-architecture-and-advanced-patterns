import { Alarm } from '../../domain/alarm';

export abstract class CreateAlarmRepository {
  abstract save(alarm: Alarm): Promise<Alarm>;
}