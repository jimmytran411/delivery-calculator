import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import DateFnsUtils from '@date-io/date-fns';

import { InputField } from './Components/InputField';
import { useFormStyles } from './styles/formStyles';
import { CalculateDeliveryResult, ResultSumary } from './Components/ResultSumary';
import { useFormValidation } from './customHooks/useFormValidation';
import { calculateFee } from './utils/calculateFn';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';

export interface DeliveryInput {
  cartValue: string;
  deliveryDistance: string;
  amountOfItems: string;
  fullDate: Date;
  hour: number;
}

export const Calculator = () => {
  const [inputFields, setInputFields] = useState<DeliveryInput>({
    cartValue: '',
    deliveryDistance: '',
    amountOfItems: '',
    fullDate: new Date(),
    hour: new Date().getHours(),
  });
  const [openResult, setOpenResult] = useState(false);
  const [result, setResult] = useState<CalculateDeliveryResult>({
    cartValueCharge: 0,
    distanceCharge: 0,
    itemAmountCharge: 0,
    specialCharge: 0,
    discount: 0,
    total: 0,
  });

  const { errors, validateField, isEmptyError } = useFormValidation();
  const { root, formTitle, left, form, inputField, submitBtn, right } = useFormStyles();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Object.entries(inputFields).forEach(([key, value]) => validateField(value, key));

    if (isEmptyError) {
      setResult(calculateFee(inputFields));
      setOpenResult(true);
    }
  };

  const handleInput = useCallback(
    _.debounce((input: string | Date, prop: keyof DeliveryInput) => {
      validateField(input, prop);
      setInputFields((prev) => ({ ...prev, [prop]: input }));
    }, 300),
    []
  );

  useEffect(() => {
    if (!isEmptyError) {
      setOpenResult(false);
    }
  }, [isEmptyError]);

  return (
    <Grid container className={root}>
      <Grid item xs className={left}>
        <form onSubmit={handleSubmit} className={form}>
          <span className={formTitle}>Delivery Calculator</span>
          <InputField
            className={inputField}
            label="cart value"
            name="cartValue"
            error={errors.cartValue}
            inputProps={{
              onChange: (event) => handleInput(event.target.value, 'cartValue'),
            }}
          />
          <InputField
            className={inputField}
            label="delivery distance"
            name="deliverDistance"
            error={errors.deliveryDistance}
            inputProps={{
              onChange: (event) => handleInput(event.target.value, 'deliveryDistance'),
            }}
          />
          <InputField
            className={inputField}
            label="items amount"
            name="amountOfItems"
            error={errors.amountOfItems}
            inputProps={{
              onChange: (event) => handleInput(event.target.value, 'amountOfItems'),
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className={inputField}
              inputVariant="outlined"
              label="Date"
              value={inputFields.fullDate}
              onChange={(e) => handleInput(e?.toString() ?? new Date(), 'fullDate')}
            />
            <TimePicker
              className={inputField}
              inputVariant="outlined"
              label="Time"
              value={inputFields.fullDate}
              onChange={(e) => handleInput(e?.getHours().toString() ?? new Date().getHours().toString(), 'hour')}
            />
          </MuiPickersUtilsProvider>

          <button className={submitBtn} type="submit">
            Calculate Delivery Price
          </button>
        </form>
      </Grid>
      <Grid item xs className={right}>
        {openResult && isEmptyError ? <ResultSumary result={result} /> : ''}
      </Grid>
    </Grid>
  );
};
