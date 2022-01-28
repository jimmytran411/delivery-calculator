import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@material-ui/core';
import _ from 'lodash';

interface InputFieldProps {
  name: string;
  label: string;
  error: string;
  className?: string;
  handleInput: (input: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ name, error, label, className, handleInput }) => {
  const handleDebounceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(e.target.value);
  };
  return (
    <>
      <FormControl className={className} variant="outlined" error={error.length ? true : false}>
        <InputLabel htmlFor={name}>{_.capitalize(label)}</InputLabel>
        <OutlinedInput id={name} type="text" label={name} onChange={handleDebounceOnChange} />
        <FormHelperText error={error.length ? true : false}>{error}</FormHelperText>
      </FormControl>
    </>
  );
};
