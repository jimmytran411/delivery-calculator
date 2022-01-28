import { addDays, differenceInDays, getDay, lastDayOfMonth, subDays } from 'date-fns';
import { chunk } from 'lodash';

import { DayInWeek } from '../../../commonTypes';

type DateOfMonth = { date: number; fullDate: Date };
interface CurrentCalendarMonth {
  currentMonth: number;
  currentYear: number;
  datesOfCurrentMonth: DateOfMonth[][];
}

// assumming working hours from 10:00 to 2:00 of next day
const deliveryHours = Array.from(
  {
    length: 16,
  },
  (e, i) => `${i + 10 >= 24 ? i + 10 - 24 : i + 10}:00 - ${i + 11 >= 24 ? i + 11 - 24 : i + 11}:00`
);
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysOfWeekLong: DayInWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthLong = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const currentDay = new Date();
const today = {
  date: currentDay.getDate(),
  month: currentDay.getMonth(),
  year: currentDay.getFullYear(),
  day: currentDay.getDay(),
  hour: currentDay.getHours(),
};

// Fill the 6 (or 5) x 7 array (Calendar with 6 (or 5) rows and 7 columns)
const getDatesOfMonth = (firstDateOfCalendar: Date): DateOfMonth[][] => {
  const lastDateOfThisMonth = lastDayOfMonth(addDays(firstDateOfCalendar, 7));

  const numberOfRows = differenceInDays(lastDateOfThisMonth, firstDateOfCalendar) > 35 ? 6 : 5;
  return chunk(
    Array.from({ length: numberOfRows * 7 }, (_e, i) => {
      const fullDate = addDays(firstDateOfCalendar, i);

      return {
        date: fullDate.getDate(),
        fullDate,
      };
    }),
    7
  );
};

const getNewDate = (month = today.month, year = today.year) => {
  const firstDateOfThisMonth = new Date(year, month, 1);
  let current = {
    currentMonth: month,
    currentYear: year,
    datesOfCurrentMonth: getDatesOfMonth(subDays(firstDateOfThisMonth, getDay(firstDateOfThisMonth))),
  };

  return (f: typeof getNextMonth | typeof getPreviousMonth): CurrentCalendarMonth => {
    current = f(current);
    return current;
  };
};

const getNextMonth = (current: CurrentCalendarMonth): CurrentCalendarMonth => {
  const { currentYear, currentMonth, datesOfCurrentMonth } = current;
  const nextMonth = currentMonth + 1;

  return {
    ...current,
    currentMonth: nextMonth > 11 ? 0 : nextMonth,
    currentYear: nextMonth > 11 ? currentYear + 1 : currentYear,
    datesOfCurrentMonth: getDatesOfMonth(datesOfCurrentMonth[datesOfCurrentMonth.length - 1][0].fullDate),
  };
};

const getPreviousMonth = (current: CurrentCalendarMonth): CurrentCalendarMonth => {
  const { currentMonth, currentYear } = current;

  const previousMonth = currentMonth - 1;
  const previousYear = previousMonth < 0 ? currentYear - 1 : currentYear;
  const firstDateOfPreviousMonth = new Date(previousYear, previousMonth, 1);

  return {
    ...current,
    currentMonth: previousMonth < 0 ? 11 : previousMonth,
    currentYear: previousMonth < 0 ? currentYear - 1 : currentYear,
    datesOfCurrentMonth: getDatesOfMonth(subDays(firstDateOfPreviousMonth, getDay(firstDateOfPreviousMonth))),
  };
};

const getDates = getNewDate();

export {
  deliveryHours,
  monthLong,
  daysOfWeek,
  getDates,
  getNextMonth,
  getPreviousMonth,
  today,
  daysOfWeekLong,
  getDatesOfMonth,
  getNewDate,
};

const sD = () => {
  let selectedDate: Date;
  return (f: (date: Date) => Date) => {
    selectedDate = f(selectedDate);
    return selectedDate;
  };
};

export const select = sD();
