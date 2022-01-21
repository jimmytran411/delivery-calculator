import React, { useCallback, useState } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import _ from 'lodash';

import { InputField } from './Components/InputField';
import { useFormStyles } from '../../styles/formStyles';
import { calculateDeliveryFee, calculateMultiplier, maximumDeliveryFee, promotionDate } from './utils/calculateFn';
import { daysOfWeekLong, monthLong, today } from './utils/date';
import { CalendarMenu } from './Components/CalendarMenu';
import { DeliveryHours } from './Components/DeliveryHours';
import { DayInWeek } from '../../commonTypes';

export const Calculator = () => {
  const [inputFields, setInputFields] = useState({
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 1,
    day: {
      date: today.date,
      day: daysOfWeekLong[today.day],
      month: today.month,
      hour: today.hour,
    },
  });
  const [errors, setErrors] = useState({ cartValue: '', deliveryDistance: '', amountOfItems: '' });
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const { form, submitBtn } = useFormStyles();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { cartValue, deliveryDistance, amountOfItems, day } = inputFields;
    let deliveryFee = calculateDeliveryFee(cartValue, deliveryDistance, amountOfItems);
    deliveryFee *= calculateMultiplier(day.day, day.hour, promotionDate);
    setDeliveryPrice(deliveryFee >= maximumDeliveryFee ? maximumDeliveryFee : deliveryFee.toFixed(2));
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

  const handleSelectDate = (date: number, day: DayInWeek, month: number) => {
    setInputFields((prev) => ({ ...prev, day: { ...prev.day, date, day, month } }));
  };

  const handleSelectTime = (time: string) => {
    time === 'now'
      ? setInputFields((prev) => ({ ...prev, day: { ...prev.day, hour: today.hour } }))
      : setInputFields((prev) => ({ ...prev, day: { ...prev.day, hour: +time.split(':')[0] } }));
  };

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

          <FormControl variant="outlined">
            <InputLabel htmlFor="date">{_.capitalize('delivery date')}</InputLabel>
            <OutlinedInput
              id="date"
              type="text"
              required={true}
              label="date"
              disabled
              endAdornment={
                <InputAdornment position="end">
                  <CalendarMenu handleSelectDate={handleSelectDate} />
                </InputAdornment>
              }
              value={`${inputFields.day.day} ${inputFields.day.date} ${monthLong[inputFields.day.month - 1]}`}
            />
          </FormControl>

          <DeliveryHours handleSelectTime={handleSelectTime} />

          <Button className={submitBtn} variant="outlined" color="primary" type="submit">
            Calculate Delivery Price
          </Button>
        </form>
      </Grid>
      <Grid item xs>
        Delivery Price: {deliveryPrice}€
      </Grid>
    </Grid>
  );
};
