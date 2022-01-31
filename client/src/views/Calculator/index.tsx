import React, { useCallback, useEffect, useState } from 'react';
import { Grid, InputAdornment, ThemeProvider } from '@material-ui/core';
import _ from 'lodash';
import { format } from 'date-fns';

import { InputField } from './Components/InputField';
import { useFormStyles } from './styles/formStyles';
import { CalendarMenu } from './Components/CalendarMenu';
import { TimeSelect } from './Components/TimeSelect';
import { theme } from './styles/calendarStyles';
import { ResultSumary } from './Components/ResultSumary';
import { useFormValidation } from './customHooks/useFormValidation';
import { useCalculateFee } from './customHooks/useCalculateFee';
import { deliveryHours } from './utils/date';
import { useCalendar } from './context/CalendarContext';

export interface CalculatorInput {
  cartValue: string;
  deliveryDistance: string;
  amountOfItems: string;
  fullDate: Date;
  hour: number;
}

export const Calculator = () => {
  const [inputFields, setInputFields] = useState<CalculatorInput>({
    cartValue: '',
    deliveryDistance: '',
    amountOfItems: '',
    fullDate: new Date(),
    hour: new Date().getHours(),
  });
  const [openResult, setOpenResult] = useState(false);

  const { errors, validateField, isEmptyError } = useFormValidation();
  const { result, calculateFee } = useCalculateFee();
  const { selectedDate } = useCalendar();
  const { root, formTitle, left, form, inputField, submitBtn, right } = useFormStyles();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Object.entries(inputFields).forEach(([key, value]) => validateField(value, key));

    if (isEmptyError) {
      calculateFee(inputFields);
      setOpenResult(true);
    }
  };

  const handleInput = useCallback(
    _.debounce((input: string, prop: string) => {
      validateField(input, prop);
      setInputFields((prev) => ({ ...prev, [prop]: input }));
    }, 300),
    []
  );

  const handleSelectTime = (time: string) => {
    time === 'now'
      ? setInputFields((prev) => ({ ...prev, hour: new Date().getHours() }))
      : setInputFields((prev) => ({ ...prev, hour: +time.split(':')[0] }));
  };

  useEffect(() => {
    if (!isEmptyError) {
      setOpenResult(false);
    }
  }, [isEmptyError]);

  useEffect(() => {
    setInputFields((prev) => ({ ...prev, fullDate: selectedDate }));
  }, [selectedDate]);

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

          <InputField
            className={inputField}
            label="date"
            name="date"
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ThemeProvider theme={theme}>
                    <CalendarMenu />
                  </ThemeProvider>
                </InputAdornment>
              ),
              value: format(inputFields.fullDate, 'PPP'),
            }}
          />

          <TimeSelect listOfHours={deliveryHours} handleSelectTime={handleSelectTime} />

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
