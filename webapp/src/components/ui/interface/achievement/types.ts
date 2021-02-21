export interface AchievementItem {
  title: string;
  active: boolean;
  description: string;
  items: any[];
  onClick: any;
  level: number;
  intl: any;
  host?: string
}
