import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { checkDeliveryFee } from '../utils/calculateFn';
import { useResultSummaryStyles } from '../styles/useResultSummaryStyles';

export interface CalculateDeliveryResult {
  cartValueCharge: number;
  distanceCharge: number;
  itemAmountCharge: number;
  specialCharge: number;
  discount: number;
  total: number;
}
interface ResultSumaryProps {
  result: CalculateDeliveryResult;
}

export const ResultSumary = ({ result }: ResultSumaryProps) => {
  const { cartValueCharge, distanceCharge, itemAmountCharge, specialCharge, discount, total } = result;

  const { root, charge, title, totalStyle } = useResultSummaryStyles();

  return (
    <Grid container direction="column" className={root}>
      <span className={title}>Delivery Fee</span>
      <Grid container item justifyContent="space-between" className={charge}>
        <Grid item>Cart value charge:</Grid>
        <Grid item>€{checkDeliveryFee(cartValueCharge)}</Grid>
      </Grid>
      <Grid container item justifyContent="space-between" className={charge}>
        <Grid item>Distance charge:</Grid>
        <Grid item>€{distanceCharge}</Grid>
      </Grid>
      <Grid container item justifyContent="space-between" className={charge}>
        <Grid item>Number of items charge:</Grid>
        <Grid item>€{itemAmountCharge}</Grid>
      </Grid>
      <Grid container item justifyContent="space-between" className={charge}>
        <Grid item>Special time charge:</Grid>
        <Grid item>€{specialCharge.toFixed(2)}</Grid>
      </Grid>
      {discount > 0 && (
        <Grid container item justifyContent="space-between" className={charge}>
          <Grid item>Discount:</Grid>
          <Grid item>-€{discount.toFixed(2)}</Grid>
        </Grid>
      )}
      <Divider />

      <Grid container item justifyContent="space-between" className={totalStyle}>
        <Grid item>Total:</Grid>
        <Grid item>€{checkDeliveryFee(total).toFixed(2)}</Grid>
      </Grid>
    </Grid>
  );
};
