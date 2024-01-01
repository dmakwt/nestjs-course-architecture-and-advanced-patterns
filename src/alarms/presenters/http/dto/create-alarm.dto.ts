// Remember that ideally you would want some validation here - some homework if you want to add some extra real-world functionality!
export class CreateAlarmDto {
  name: string;
  severity: string;
  triggeredAt: Date;
  items: Array<{
    name: string;
    type: string;
  }>;
}
