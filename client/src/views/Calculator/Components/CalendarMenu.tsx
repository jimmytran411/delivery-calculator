import React from 'react';
import { Menu, Button } from '@material-ui/core';
import { EventNote } from '@material-ui/icons';

import { Calendar } from './Calendar';

interface CalendarMenuProps {
  handleSelectDate: (fullDate: Date) => void;
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
    <>
      <Button
        id="calendar-btn"
        data-testid="calendar-btn"
        aria-controls={open ? 'calendar' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <EventNote />
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
    </>
  );
}
