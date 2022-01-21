export type DayInWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type PromotionTime = {
  day: string;
  timePeriod: number[][];
  multiplier: number;
  name: string;
};
