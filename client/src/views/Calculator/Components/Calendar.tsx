import React from 'react';
import { TableContainer, ButtonGroup, Button, Grid, Divider } from '@material-ui/core';
import { v4 } from 'uuid';
import { compareAsc, isPast, isThisMonth, isToday } from 'date-fns';

import { daysOfWeek, daysOfWeekLong, monthLong, today } from '../utils/date';
import { useCalendarStyles } from '../styles/calendarStyles';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { useCalendar } from '../context/CalendarContext';

interface CalendarProps {
  handleSelectDate: () => void;
}

export const Calendar: React.FC<CalendarProps> = React.forwardRef(({ handleSelectDate }, ref) => {
  const { currentCalendarMonth, selectedDate, selectDate, getNextCalendarMonth, getPreviousCalendarMonth } =
    useCalendar();

  const {
    root,
    top,
    header,
    dateMonth,
    headerBtn,
    btnGroup,
    table,
    headerCell,
    tableContent,
    row,
    todayStyle,
    cell,
    pastDay,
    selectDateStyle,
  } = useCalendarStyles();
  const { day, date, month, year } = today;

  const cellStyle = (fullDate: Date) => {
    if (isToday(fullDate)) {
      return `${todayStyle} ${cell}`;
    }
    if (isPast(fullDate)) {
      return `${pastDay} ${cell}`;
    }
    if (compareAsc(fullDate, selectedDate) === 0) {
      return `${selectDateStyle} ${cell}`;
    }
    return cell;
  };

  return (
    <TableContainer innerRef={ref} className={root}>
      <div className={top}>{`${daysOfWeekLong[day]}, ${date} ${monthLong[month]} ${year}`}</div>
      <Divider />
      <Grid container justifyContent="space-between" className={header}>
        <Grid item className={dateMonth}>
          {monthLong[currentCalendarMonth.currentMonth]} {currentCalendarMonth.currentYear}
        </Grid>

        <Grid item className={btnGroup}>
          <ButtonGroup>
            <Button
              className={headerBtn}
              variant="text"
              disabled={isThisMonth(new Date(currentCalendarMonth.currentYear, currentCalendarMonth.currentMonth))}
              onClick={getPreviousCalendarMonth}
            >
              <NavigateBefore />
            </Button>
            <Button className={headerBtn} variant="text" onClick={getNextCalendarMonth}>
              <NavigateNext />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <div role="grid" className={table}>
        <div role="row" className={row}>
          {daysOfWeek.map((day) => (
            <span className={headerCell} role="columnheader" key={v4()}>
              {day}
            </span>
          ))}
        </div>
        <div role="rolegroup" className={tableContent}>
          {currentCalendarMonth.datesOfCurrentMonth.map((calendarRow) => (
            <div role="row" className={row} key={v4()}>
              {calendarRow.map(({ date, fullDate }) => (
                <span
                  role="gridcell"
                  onClick={() => {
                    if (isPast(fullDate)) {
                      if (isToday(fullDate)) {
                        selectDate(fullDate);
                        handleSelectDate();
                      }
                      return;
                    }
                    handleSelectDate();
                    selectDate(fullDate);
                  }}
                  key={v4()}
                  className={cellStyle(fullDate)}
                >
                  {date}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </TableContainer>
  );
});
