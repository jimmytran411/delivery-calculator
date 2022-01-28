import React, { useCallback, useState } from 'react';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, ThemeProvider } from '@material-ui/core';
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
  const { root, formTitle, left, form, inputField, submitBtn } = useFormStyles();

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
      setOpenResult(false);
      validateField(input, prop);
      setInputFields((prev) => ({ ...prev, [prop]: input }));
    }, 300),
    []
  );

  const handleSelectDate = (fullDate: Date) => {
    setOpenResult(false);
    setInputFields((prev) => ({ ...prev, fullDate }));
  };

  const handleSelectTime = (time: string) => {
    setOpenResult(false);
    time === 'now'
      ? setInputFields((prev) => ({ ...prev, hour: new Date().getHours() }))
      : setInputFields((prev) => ({ ...prev, hour: +time.split(':')[0] }));
  };

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
            handleInput={(input) => handleInput(input, 'cartValue')}
          />
          <InputField
            className={inputField}
            label="delivery distance"
            name="deliverDistance"
            error={errors.deliveryDistance}
            handleInput={(input) => handleInput(input, 'deliveryDistance')}
          />
          <InputField
            className={inputField}
            label="items amount"
            name="amountOfItems"
            error={errors.amountOfItems}
            handleInput={(input) => handleInput(input, 'amountOfItems')}
          />

          <FormControl className={inputField} variant="outlined">
            <InputLabel htmlFor="date">{_.capitalize('delivery date')}</InputLabel>
            <OutlinedInput
              id="date"
              type="text"
              label="date"
              endAdornment={
                <InputAdornment position="end">
                  <ThemeProvider theme={theme}>
                    <CalendarMenu handleSelectDate={handleSelectDate} />
                  </ThemeProvider>
                </InputAdornment>
              }
              value={format(inputFields.fullDate, 'PPP')}
            />
          </FormControl>

          <TimeSelect listOfHours={deliveryHours} handleSelectTime={handleSelectTime} />

          <button className={submitBtn} type="submit">
            Calculate Delivery Price
          </button>
        </form>
      </Grid>
      <Grid item xs>
        {openResult && isEmptyError ? <ResultSumary result={result} /> : ''}
      </Grid>
    </Grid>
  );
};
