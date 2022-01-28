import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { v4 } from 'uuid';
import { format } from 'date-fns';

import { useTimeSelectStyles } from '../styles/timeSelectStyles';

interface TimeSelectProps {
  handleSelectTime: (hour: string) => void;
  listOfHours: string[];
}

export function TimeSelect({ handleSelectTime, listOfHours }: TimeSelectProps) {
  const [hour, setHour] = React.useState('now');

  const { root, select, label, option } = useTimeSelectStyles();

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: any;
    }>
  ) => {
    setHour(event.target.value);
    handleSelectTime(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth className={root} variant="outlined">
        <InputLabel htmlFor="Time Select" className={label}>
          Time
        </InputLabel>
        <Select id="Time Select" value={hour} onChange={handleChange} className={select}>
          <MenuItem className={option} value="now">
            Now: {format(new Date(), 'HH:mm')}
          </MenuItem>
          {listOfHours.map((hour) => (
            <MenuItem className={option} key={v4()} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
