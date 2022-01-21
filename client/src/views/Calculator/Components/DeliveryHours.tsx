import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 } from 'uuid';

import { deliveryHours } from '../utils/date';

interface DeliveryHoursProps {
  handleSelectTime: (hour: string) => void;
}

export function DeliveryHours({ handleSelectTime }: DeliveryHoursProps) {
  const [hour, setHour] = React.useState('');

  const handleChange = (event: any) => {
    setHour(event.target.value);
    handleSelectTime(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Time</InputLabel>
        <Select value={hour} label="Delivery Hours" onChange={handleChange}>
          <MenuItem value="now">Now</MenuItem>
          {deliveryHours.map((hour) => (
            <MenuItem key={v4()} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
