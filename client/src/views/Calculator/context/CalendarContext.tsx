import React, { useState } from 'react';
import { identity } from 'lodash';

import { CurrentCalendarMonth, getCalendarMonth, getNextMonth, getPreviousMonth } from '../utils/date';

const getDates = getCalendarMonth();

interface CalendarContextProps {
  selectedDate: Date;
  selectDate: (date: Date) => void;
  currentCalendarMonth: CurrentCalendarMonth;
  getNextCalendarMonth: () => void;
  getPreviousCalendarMonth: () => void;
}

const initialState: CalendarContextProps = {
  selectedDate: new Date(),
  selectDate: () => {},
  currentCalendarMonth: getDates(identity),
  getNextCalendarMonth: () => {},
  getPreviousCalendarMonth: () => {},
};

const CalendarContext = React.createContext(initialState);

const CalendarProvider = (props: any) => {
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(initialState.currentCalendarMonth);
  const [selectedDate, setSelectedDate] = useState(initialState.selectedDate);

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const getNextCalendarMonth = () => {
    setCurrentCalendarMonth(getDates(getNextMonth));
  };

  const getPreviousCalendarMonth = () => {
    setCurrentCalendarMonth(getDates(getPreviousMonth));
  };

  return (
    <CalendarContext.Provider
      value={{ selectedDate, currentCalendarMonth, selectDate, getNextCalendarMonth, getPreviousCalendarMonth }}
      {...props}
    />
  );
};

const useCalendar = () => React.useContext(CalendarContext);

export { CalendarProvider, useCalendar };
