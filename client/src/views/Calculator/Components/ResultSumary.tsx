import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { checkDeliveryFee } from '../utils/calculateFn';

interface ResultSumaryProps {
  result: {
    cartValueCharge: number;
    distanceCharge: number;
    itemAmountCharge: number;
    specialCharge: number;
    discount: number;
    total: number;
  };
}

export const ResultSumary = ({ result }: ResultSumaryProps) => {
  const { cartValueCharge, distanceCharge, itemAmountCharge, specialCharge, discount, total } = result;

  return (
    <Grid container direction="column">
      <Grid container item xs>
        <Grid item xs>
          Cart value charge:
        </Grid>
        <Grid item xs>
          €{checkDeliveryFee(cartValueCharge)}
        </Grid>
      </Grid>
      <Grid container item xs>
        <Grid item xs>
          Distance charge:
        </Grid>
        <Grid item xs>
          €{distanceCharge}
        </Grid>
      </Grid>
      <Grid container item xs>
        <Grid item xs>
          Number of items charge:
        </Grid>
        <Grid item xs>
          €{itemAmountCharge}
        </Grid>
      </Grid>
      <Grid container item xs>
        <Grid item xs>
          Special time charge:
        </Grid>
        <Grid item xs>
          €{specialCharge.toFixed(2)}
        </Grid>
      </Grid>
      {discount > 0 && (
        <Grid container item xs>
          <Grid item xs>
            Discount:
          </Grid>
          <Grid item xs>
            -€{discount.toFixed(2)}
          </Grid>
        </Grid>
      )}
      <Divider />

      <Grid container item xs>
        <Grid item xs>
          Total:
        </Grid>
        <Grid item xs>
          €{checkDeliveryFee(total).toFixed(2)}
        </Grid>
      </Grid>
    </Grid>
  );
};
