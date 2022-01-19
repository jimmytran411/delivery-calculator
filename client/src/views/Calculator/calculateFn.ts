import { DayInWeek } from '../../commonTypes';

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
    period: [15, 21],
    multiplier: 1.1,
    name: 'Friday rush',
  },
];
const maximumDeliveryPrice = 15;

const identity = (x: any) => x;

const calculate =
  (value = 0) =>
  (x: number, f: (arg: number) => number) =>
    f ? (value += f(x)) : (value += x);

const calculateDeliveryPrice = calculate();
const calculateSurcharge = calculate();

const calculateSurchargeFromCartValue = (cartValue: number) =>
  cartValue < baseCartValue ? baseCartValue - cartValue : 0;

const calculateSurchargeFromNumberOfItems = (numberOfItems: number) => {
  return numberOfItems <= 4 ? 0 : 0.5 * (numberOfItems - 4);
};

const calculateDistancePrice = (distance: number) => {
  const { initialDistance, initialDistanceCharge, additionalDistanceBase, additionalDistanceCharge } =
    baseDistanceValue;
  return distance <= initialDistance
    ? initialDistanceCharge
    : initialDistanceCharge +
        Math.ceil((distance - initialDistance) / additionalDistanceBase) * additionalDistanceCharge;
};

const calculateMultiplier = (day: DayInWeek, hour: number) => {
  const promotions = promotionDate.filter(
    ({ day: promotionDay, period }) => day === promotionDay && hour >= period[0] && hour <= period[1]
  );
  if (promotions.length > 1) {
    // do something in case two or more promotion time overlap
  }
  return promotions.length ? promotions[0].multiplier : 1;
};

export {
  maximumDeliveryPrice,
  calculateDeliveryPrice,
  calculateSurcharge,
  calculate,
  identity,
  calculateSurchargeFromCartValue,
  calculateSurchargeFromNumberOfItems,
  calculateDistancePrice,
  calculateMultiplier,
};
