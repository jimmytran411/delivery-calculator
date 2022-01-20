import { memoize } from 'lodash';
import { DayInWeek, PromotionTime } from '../../../commonTypes';

const baseCartValue = 10;
const baseDistanceValue = {
  initialDistance: 1000,
  initialDistanceCharge: 2,
  additionalDistanceBase: 500,
  additionalDistanceCharge: 1,
};
const promotionDate = [
  {
    day: 'Friday',
    timePeriod: [[15, 21]],
    multiplier: 1.1,
    name: 'Friday rush',
  },
];
const maximumDeliveryFee = 15;

const add = (x: number, y: number) => x + y;
const pipe =
  (...fns: any[]) =>
  (...args: any[]) =>
    fns.reduce(
      (acc, currentFn, index) => (acc >= maximumDeliveryFee ? maximumDeliveryFee : add(acc, currentFn(args[index]))),
      0
    );

const calculateSurchargeFromCartValue = memoize((cartValue: number) =>
  cartValue < baseCartValue ? baseCartValue - cartValue : 0
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

const calculateMultiplier = (day: DayInWeek, hour: number, promotionDate: PromotionTime[]) => {
  const promotions = promotionDate.filter(
    ({ day: promotionDay, timePeriod }) =>
      day === promotionDay && timePeriod.some((period) => hour >= period[0] && hour <= period[1])
  );
  if (promotions.length > 1) {
    // do something in case two or more promotion time overlap
  }
  return promotions.length ? promotions[0].multiplier : 1;
};

const calculateDeliveryFee = pipe(
  calculateSurchargeFromCartValue,
  calculateDistanceFee,
  calculateSurchargeFromNumberOfItems
);

export {
  maximumDeliveryFee,
  calculateMultiplier,
  calculateDeliveryFee,
  calculateSurchargeFromCartValue,
  calculateDistanceFee,
  calculateSurchargeFromNumberOfItems,
  promotionDate,
};
