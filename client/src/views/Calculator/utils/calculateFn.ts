import { memoize } from 'lodash';
import { PromotionTime } from '../../../commonTypes';
import { daysOfWeek } from './date';

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

const add = (x: number, y: number) => x + y;
const multiply = (x: number, y: number) => x * y;
const pipe =
  (...fns: any[]) =>
  (...args: any[]) => {
    const res = fns.reduce((acc, currentFn, index) => (acc < 0 ? acc : currentFn(acc, args[index])), 0); // -1 trigger a stop for the pipe
    if (res < 0) return 0;
    return res >= maximumDeliveryFee ? maximumDeliveryFee : res;
  };

const compose = (f: any, g: any) => (x: number, arg: any) => g(x, f(arg));

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

const calculateMultiplier = ({
  day,
  hour,
  promotionDate,
}: {
  day: typeof daysOfWeek[number];
  hour: number;
  promotionDate: PromotionTime[];
}) => {
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
  compose(calculateSurchargeFromCartValue, add),
  compose(calculateDistanceFee, add),
  compose(calculateSurchargeFromNumberOfItems, add),
  compose(calculateMultiplier, multiply)
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
