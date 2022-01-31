import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, OutlinedInputProps } from '@material-ui/core';
import _ from 'lodash';

interface InputFieldProps {
  name: string;
  label: string;
  error?: string;
  className?: string;
  inputProps?: OutlinedInputProps;
}

export const InputField: React.FC<InputFieldProps> = ({ name, error, label, className, inputProps }) => {
  return (
    <>
      <FormControl className={className} variant="outlined" error={error && error.length ? true : false}>
        <InputLabel htmlFor={name}>{_.capitalize(label)}</InputLabel>
        <OutlinedInput id={name} type="text" label={name} {...inputProps} />
        <FormHelperText error={error && error.length ? true : false}>{error}</FormHelperText>
      </FormControl>
    </>
  );
};
