import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

export abstract class FindAlarmsRepository {
  abstract findAll(): Promise<AlarmReadModel[]>;
}