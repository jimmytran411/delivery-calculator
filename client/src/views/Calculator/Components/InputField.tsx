import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@material-ui/core';
import _ from 'lodash';

interface InputFieldProps {
  name: string;
  label: string;
  error: string;
  handleInput: (input: string) => any;
}

export const InputField: React.FC<InputFieldProps> = ({ name, error, label, handleInput }) => {
  const handleDebounceOnChange = (e: any) => {
    handleInput(e.target.value);
  };
  return (
    <>
      <FormControl variant="outlined" error={error.length ? true : false}>
        <InputLabel htmlFor={name}>{_.capitalize(label)}</InputLabel>
        <OutlinedInput id={name} type="text" required={true} label={name} onChange={handleDebounceOnChange} />
        <FormHelperText error={error.length ? true : false}>{error}</FormHelperText>
      </FormControl>
    </>
  );
};
