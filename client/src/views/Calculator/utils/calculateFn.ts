import { memoize } from 'lodash';

import { DeliveryInput } from '..';
import { DayInWeek, PromotionTime } from '../../../commonTypes';
import { CalculateDeliveryResult } from '../Components/ResultSumary';

const daysOfWeekLong: DayInWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

const calculateFee = (calculateInputs: DeliveryInput): CalculateDeliveryResult => {
  const { cartValue, deliveryDistance, amountOfItems, fullDate, hour } = calculateInputs;
  const cartValueCharge = calculateSurchargeFromCartValue(+cartValue);
  const distanceCharge = calculateDistanceFee(+deliveryDistance);
  const itemAmountCharge = calculateSurchargeFromNumberOfItems(+amountOfItems);
  const multiplier = checkPromotion({ day: daysOfWeekLong[fullDate.getDay()], hour, promotionDate });

  const total = cartValueCharge < 0 ? 0 : (cartValueCharge + distanceCharge + itemAmountCharge) * multiplier;
  const discount = total > maximumDeliveryFee ? total - maximumDeliveryFee : 0;
  const specialCharge = total - (cartValueCharge + distanceCharge + itemAmountCharge);
  return total > 0
    ? { cartValueCharge, distanceCharge, itemAmountCharge, specialCharge, discount, total }
    : {
        cartValueCharge: 0,
        distanceCharge: 0,
        itemAmountCharge: 0,
        specialCharge: 0,
        discount: 0,
        total: 0,
      };
};

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
  calculateFee,
  calculateSurchargeFromCartValue,
  calculateDistanceFee,
  calculateSurchargeFromNumberOfItems,
  promotionDate,
  checkDeliveryFee,
};
