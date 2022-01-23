import { PromotionTime } from '../../../commonTypes';
import {
  calculateSurchargeFromCartValue,
  calculateDistanceFee,
  calculateSurchargeFromNumberOfItems,
  calculateDeliveryFee,
  calculateMultiplier,
  maximumDeliveryFee,
} from '../utils/calculateFn';

describe('Test functions calculating Delivery Fee', () => {
  const promotionDate: PromotionTime[] = [
    {
      day: 'Friday',
      timePeriod: [[15, 21]],
      multiplier: 1.1,
      name: 'Friday rush',
    },
  ];

  const timeInput = { day: 'Sunday', hour: 10, promotionDate };
  const timeInputPromotion = { day: 'Friday', hour: 15, promotionDate };

  test('Surcharge from cartValue should return 0 if the value is above baseCartValue, or the remaining from baseCartValue and cartValue', () => {
    expect(calculateSurchargeFromCartValue(9)).toBe(1);
    expect(calculateSurchargeFromCartValue(10)).toBe(0);
    expect(calculateSurchargeFromCartValue(11)).toBe(0);
  });

  test('Delivery fee should be 2€ for the first 1km, and 1€ for every additional 500m', () => {
    expect(calculateDistanceFee(500)).toBe(2);
    expect(calculateDistanceFee(1001)).toBe(3);
    expect(calculateDistanceFee(1501)).toBe(4);
  });

  test('If the number of items is five or more, an additional 50 cent surcharge is added for each item above four', () => {
    expect(calculateSurchargeFromNumberOfItems(4)).toBe(0);
    expect(calculateSurchargeFromNumberOfItems(5)).toBe(0.5);
    expect(calculateSurchargeFromNumberOfItems(10)).toBe(3);
  });

  test('It should return the multiplier of the surcharge when deliver during specific time', () => {
    expect(calculateMultiplier(timeInput)).toBe(1);
    expect(calculateMultiplier({ day: 'Friday', hour: 22, promotionDate })).toBe(1);
    expect(calculateMultiplier(timeInputPromotion)).toBe(1.1);
  });

  test(`It should calculate delivery fee with maximum value does not exceed ${maximumDeliveryFee}, delivery fee will be 0 with cartValue equal or greater than 100`, () => {
    const input = { cartValue: 9, deliveryDistance: 1000, amountOfItems: 1 };
    expect(calculateDeliveryFee(input.cartValue, input.deliveryDistance, input.amountOfItems, timeInput)).toBe(3);
    expect(calculateDeliveryFee(12, 15001, 1, timeInputPromotion)).toBe(15);
    expect(calculateDeliveryFee(100, 15001, 1, timeInputPromotion)).toBe(0);
  });
});
