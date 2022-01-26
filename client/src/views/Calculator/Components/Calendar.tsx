import React, { useMemo, useState } from 'react';
import { identity } from 'lodash';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Button,
  Grid,
  Divider,
} from '@material-ui/core';
import { v4 } from 'uuid';
import { isPast, isThisMonth, isToday } from 'date-fns';

import { daysOfWeek, daysOfWeekLong, getDates, getNextMonth, getPreviousMonth, monthLong, today } from '../utils/date';
import { useCalendarStyles } from '../styles/calendarStyles';

interface CalendarProps {
  handleSelectDate: (fullDate: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = React.forwardRef(({ handleSelectDate }, ref) => {
  const datesOfCurrentMonth = useMemo(() => getDates(identity), [getDates]);
  const [dates, setDates] = useState(datesOfCurrentMonth);

  const { todayStyle, dateStyle } = useCalendarStyles();
  const { day, date, month, year } = today;

  const handlePreviousMonth = () => {
    const datesOfPreviousMonth = getDates(getPreviousMonth);
    setDates(datesOfPreviousMonth);
  };

  const handleNextMonth = () => {
    setDates(getDates(getNextMonth));
  };

  return (
    <TableContainer component={Paper} innerRef={ref}>
      <div>{`${daysOfWeekLong[day]}, ${date} ${monthLong[month]} ${year}`}</div>
      <Divider />
      <Grid container justifyContent="space-between">
        <Grid item xs>
          <div>
            {monthLong[dates.currentMonth]} {dates.currentYear}
          </div>
        </Grid>
        <Grid item xs>
          <ButtonGroup>
            <Button
              disabled={isThisMonth(new Date(dates.currentYear, dates.currentMonth))}
              onClick={handlePreviousMonth}
            >{`<`}</Button>
            <Button onClick={handleNextMonth}>{`>`}</Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            {daysOfWeek.map((day) => (
              <TableCell key={v4()} align="center">
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dates.datesOfCurrentMonth.map((row) => (
            <TableRow key={v4()}>
              {row.map(({ date, fullDate }) => (
                <TableCell
                  key={v4()}
                  component="th"
                  scope="row"
                  align="center"
                  className={isToday(fullDate) ? `${todayStyle} ${dateStyle}` : dateStyle}
                >
                  <Button
                    onClick={() => handleSelectDate(fullDate)}
                    disabled={isToday(fullDate) ? false : isPast(fullDate)}
                  >
                    {date}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
