import React, { useMemo, useState } from 'react';
import { identity } from 'lodash';
import { TableContainer, ButtonGroup, Button, Grid, Divider } from '@material-ui/core';
import { v4 } from 'uuid';
import { isPast, isThisMonth, isToday } from 'date-fns';

import { daysOfWeek, daysOfWeekLong, getDates, getNextMonth, getPreviousMonth, monthLong, today } from '../utils/date';
import { useCalendarStyles } from '../styles/calendarStyles';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

interface CalendarProps {
  handleSelectDate: (fullDate: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = React.forwardRef(({ handleSelectDate }, ref) => {
  const datesOfCurrentMonth = useMemo(() => getDates(identity), [getDates]);
  const [dates, setDates] = useState(datesOfCurrentMonth);

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
  } = useCalendarStyles();
  const { day, date, month, year } = today;

  const handlePreviousMonth = () => {
    const datesOfPreviousMonth = getDates(getPreviousMonth);
    setDates(datesOfPreviousMonth);
  };

  const handleNextMonth = () => {
    setDates(getDates(getNextMonth));
  };

  return (
    <TableContainer innerRef={ref} className={root}>
      <div className={top}>{`${daysOfWeekLong[day]}, ${date} ${monthLong[month]} ${year}`}</div>
      <Divider />
      <Grid container justifyContent="space-between" className={header}>
        <Grid item className={dateMonth}>
          {monthLong[dates.currentMonth]} {dates.currentYear}
        </Grid>

        <Grid item className={btnGroup}>
          <ButtonGroup>
            <Button
              className={headerBtn}
              variant="text"
              disabled={isThisMonth(new Date(dates.currentYear, dates.currentMonth))}
              onClick={handlePreviousMonth}
            >
              <NavigateBefore />
            </Button>
            <Button className={headerBtn} variant="text" onClick={handleNextMonth}>
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
          {dates.datesOfCurrentMonth.map((calendarRow) => (
            <div role="row" className={row} key={v4()}>
              {calendarRow.map(({ date, fullDate }) => (
                <span
                  role="gridcell"
                  onClick={() => {
                    if (isPast(fullDate)) {
                      isToday(fullDate) && handleSelectDate(fullDate);
                      return;
                    }
                    handleSelectDate(fullDate);
                  }}
                  key={v4()}
                  className={
                    isToday(fullDate) ? `${todayStyle} ${cell}` : isPast(fullDate) ? `${pastDay} ${cell}` : cell
                  }
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
