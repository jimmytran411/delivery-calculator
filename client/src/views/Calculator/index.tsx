import React, { useCallback, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import _, { identity } from 'lodash';

import { InputField } from './Components/InputField';
import { useFormStyles } from '../../styles/formStyles';
import {
  calculate,
  calculateDistancePrice,
  calculateSurchargeFromCartValue,
  calculateSurchargeFromNumberOfItems,
  maximumDeliveryPrice,
} from './calculateFn';

export const Calculator = () => {
  const [inputFields, setInputFields] = useState({ cartValue: 0, deliveryDistance: 0, amountOfItems: 1 });
  const [errors, setErrors] = useState({ cartValue: '', deliveryDistance: '', amountOfItems: '' });
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const { form, submitBtn } = useFormStyles();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { cartValue, deliveryDistance, amountOfItems } = inputFields;
    const calculateDeliveryPrice = calculate();
    const calculateSurcharge = calculate();
    calculateSurcharge(cartValue, calculateSurchargeFromCartValue);
    calculateSurcharge(amountOfItems, calculateSurchargeFromNumberOfItems);

    calculateDeliveryPrice(deliveryDistance, calculateDistancePrice);
    calculateDeliveryPrice(calculateSurcharge(0, identity), identity);
    const price = calculateDeliveryPrice(0, identity);
    setDeliveryPrice(price > maximumDeliveryPrice ? 15 : price);
  };

  const handleInput = useCallback(
    _.debounce((input: string, prop: string) => {
      if (isNaN(+input)) {
        setErrors((prev) => ({ ...prev, [prop]: 'Please give a number' }));
      } else {
        setErrors((prev) => ({ ...prev, [prop]: '' }));
        setInputFields((prev) => ({ ...prev, [prop]: +input }));
      }
    }, 500),
    []
  );

  return (
    <Grid container>
      <Grid item xs>
        <form onSubmit={handleSubmit} className={form}>
          <InputField
            label="cart value"
            name="cartValue"
            error={errors.cartValue}
            handleInput={(input) => handleInput(input, 'cartValue')}
          />
          <InputField
            label="delivery distance"
            name="deliverDistance"
            error={errors.deliveryDistance}
            handleInput={(input) => handleInput(input, 'deliveryDistance')}
          />
          <InputField
            label="items amount"
            name="amountOfItems"
            error={errors.amountOfItems}
            handleInput={(input) => handleInput(input, 'amountOfItems')}
          />

          <Button className={submitBtn} variant="outlined" color="primary" type="submit">
            Calculate Delivery Price
          </Button>
        </form>
      </Grid>
      <Grid item xs>
        {deliveryPrice}
      </Grid>
    </Grid>
  );
};
