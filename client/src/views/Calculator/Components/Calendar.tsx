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

import { daysOfWeek, daysOfWeekLong, getDates, getNextMonth, getPreviousMonth, monthLong, today } from '../utils/date';
import { useCalendarStyles } from '../../../styles/calendarStyles';
import { DayInWeek } from '../../../commonTypes';

interface CalendarProps {
  handleSelectDate: (date: number, day: DayInWeek, month: number) => void;
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
      <div>{`${daysOfWeekLong[day]}, ${date} ${monthLong[month - 1]} ${year}`}</div>
      <Divider />
      <Grid container justifyContent="space-between">
        <Grid item xs>
          <div>
            {monthLong[dates.currentMonth - 1]} {dates.currentYear}
          </div>
        </Grid>
        <Grid item xs>
          <ButtonGroup>
            <Button disabled={dates.currentMonth === month} onClick={handlePreviousMonth}>{`<`}</Button>
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
          {dates.dates.map((row) => (
            <TableRow key={v4()}>
              {row.map((date, index) => (
                <TableCell
                  key={v4()}
                  component="th"
                  scope="row"
                  align="center"
                  className={
                    date === today.date && dates.currentMonth === today.month && dates.currentYear === today.year
                      ? `${todayStyle} ${dateStyle}`
                      : dateStyle
                  }
                  onClick={() => handleSelectDate(date, daysOfWeekLong[index], dates.currentMonth)}
                >
                  {date === today.date && dates.currentMonth === today.month ? <b>{date}</b> : date}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
