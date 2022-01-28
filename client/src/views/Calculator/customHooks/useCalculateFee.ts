import { multiply, add } from 'lodash';
import { useState } from 'react';

import { CalculatorInput } from '..';
import {
  calculateDistanceFee,
  calculatePipe,
  calculateSurchargeFromCartValue,
  calculateSurchargeFromNumberOfItems,
  checkPromotion,
  maximumDeliveryFee,
  promotionDate,
} from '../utils/calculateFn';
import { daysOfWeekLong } from '../utils/date';

export const useCalculateFee = () => {
  const [result, setResult] = useState({
    cartValueCharge: 0,
    distanceCharge: 0,
    itemAmountCharge: 0,
    specialCharge: 0,
    discount: 0,
    total: 0,
  });

  const calculateFee = (calculateInputs: CalculatorInput) => {
    const { cartValue, deliveryDistance, amountOfItems, fullDate, hour } = calculateInputs;
    const cartValueCharge = calculateSurchargeFromCartValue(+cartValue);
    const distanceCharge = calculateDistanceFee(+deliveryDistance);
    const itemAmountCharge = calculateSurchargeFromNumberOfItems(+amountOfItems);
    const multiplier = checkPromotion({ day: daysOfWeekLong[fullDate.getDay()], hour, promotionDate });

    const calculateDeliveryFee = calculatePipe(add, add, add, multiply);
    const total = calculateDeliveryFee(cartValueCharge, distanceCharge, itemAmountCharge, multiplier);
    const discount = total > maximumDeliveryFee ? total - maximumDeliveryFee : 0;
    const specialCharge = total - calculatePipe(add, add, add)(cartValueCharge, distanceCharge, itemAmountCharge);

    if (total > 0) {
      setResult({ cartValueCharge, distanceCharge, itemAmountCharge, specialCharge, discount, total });
    } else {
      setResult({
        cartValueCharge: 0,
        distanceCharge: 0,
        itemAmountCharge: 0,
        specialCharge: 0,
        discount: 0,
        total: 0,
      });
    }
  };

  return { result, calculateFee };
};
