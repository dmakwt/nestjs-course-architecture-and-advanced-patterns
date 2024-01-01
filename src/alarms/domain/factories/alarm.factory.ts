import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Alarm } from "../alarm";
import { AlarmItem } from "../alarm-item";
import { AlarmCreatedEvent } from "../events/alarm-created.event";
import { AlarmSeverity } from "../value-objects/alarm-severity";

@Injectable()
export class AlarmFactory {
  create(
    name: string,
    severity: string,
    triggeredAt: Date,
    items: Array<{ name: string; type: string; }>,
  ) {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity["value"]);
    const alarm = new Alarm(alarmId);

    alarm.name = name;
    alarm.severity = alarmSeverity;
    alarm.triggeredAt = triggeredAt;

    items
      .forEach(item => alarm.addAlarmItem(
        new AlarmItem(
          randomUUID(),
          item.name,
          item.type,
        )
      ));

    alarm.apply(
      new AlarmCreatedEvent(alarm),
      { skipHandler: true },
    );

    return alarm;
  }
}