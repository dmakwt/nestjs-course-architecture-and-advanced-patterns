import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

export abstract class UpsertMaterializedAlarmRepository {
  abstract upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void>;
}
