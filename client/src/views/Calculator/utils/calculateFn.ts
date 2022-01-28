import { memoize } from 'lodash';
import { DayInWeek, PromotionTime } from '../../../commonTypes';

const baseCartValue = 10;
const baseDistanceValue = {
  initialDistance: 1000,
  initialDistanceCharge: 2,
  additionalDistanceBase: 500,
  additionalDistanceCharge: 1,
};
const promotionDate: PromotionTime[] = [
  {
    day: 'Friday',
    timePeriod: [[15, 21]],
    multiplier: 1.1,
    name: 'Friday rush',
  },
];
const maximumDeliveryFee = 15;

export type CheckPromotionArg = {
  day: DayInWeek;
  hour: number;
  promotionDate: PromotionTime[];
};

const calculatePipe =
  <T>(...fns: ComposeReturn<T>[]) =>
  (...args: T[]): number =>
    fns.reduce((acc, currentFn, index) => (acc < 0 ? acc : currentFn(acc, args[index])), 0); // -1 trigger a stop for the pipe

type ComposeReturn<T> = (x: number, arg: T) => number;

const checkDeliveryFee = (fee: number): number => {
  if (fee < 0) return 0;
  return fee > maximumDeliveryFee ? maximumDeliveryFee : fee;
};

const calculateSurchargeFromCartValue = memoize((cartValue: number) =>
  cartValue >= 100 ? -1 : cartValue < baseCartValue ? baseCartValue - cartValue : 0
);

const calculateSurchargeFromNumberOfItems = memoize((numberOfItems: number) => {
  return numberOfItems <= 4 ? 0 : 0.5 * (numberOfItems - 4);
});

const calculateDistanceFee = memoize((distance: number) => {
  const { initialDistance, initialDistanceCharge, additionalDistanceBase, additionalDistanceCharge } =
    baseDistanceValue;
  return distance <= initialDistance
    ? initialDistanceCharge
    : initialDistanceCharge +
        Math.ceil((distance - initialDistance) / additionalDistanceBase) * additionalDistanceCharge;
});

const checkPromotion = memoize(({ day, hour, promotionDate }: CheckPromotionArg) => {
  const promotions = promotionDate.filter(
    ({ day: promotionDay, timePeriod }) =>
      day === promotionDay && timePeriod.some(([start, end]) => hour >= start && hour < end)
  );
  if (promotions.length > 1) {
    // do something in case two or more promotion time overlap
  }
  return promotions.length ? promotions[0].multiplier : 1;
});

export {
  maximumDeliveryFee,
  checkPromotion,
  calculatePipe,
  calculateSurchargeFromCartValue,
  calculateDistanceFee,
  calculateSurchargeFromNumberOfItems,
  promotionDate,
  checkDeliveryFee,
};
