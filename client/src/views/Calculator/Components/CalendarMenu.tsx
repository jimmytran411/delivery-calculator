import React from 'react';
import { Menu, Button } from '@material-ui/core';

import { Calendar } from './Calendar';
import { DayInWeek } from '../../../commonTypes';

interface CalendarMenuProps {
  handleSelectDate: (date: number, day: DayInWeek, month: number) => void;
}

export function CalendarMenu({ handleSelectDate }: CalendarMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="calendar-btn"
        aria-controls={open ? 'calendar' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Calendar
      </Button>
      <Menu
        id="calendar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'calendar-btn',
        }}
      >
        <Calendar
          handleSelectDate={(...args) => {
            handleClose();
            handleSelectDate(...args);
          }}
        />
      </Menu>
    </div>
  );
}
