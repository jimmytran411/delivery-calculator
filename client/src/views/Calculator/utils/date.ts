import { chunk } from 'lodash';
import { DayInWeek } from '../../../commonTypes';

interface CurrentCalendarMonth {
  currentMonth: number;
  currentYear: number;
  datesOfCurrentMonth: number[][];
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
const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const currentDay = new Date();
const today = {
  date: currentDay.getDate(),
  month: currentDay.getMonth() + 1,
  year: currentDay.getFullYear(),
  day: currentDay.getDay(),
  hour: currentDay.getHours(),
};

const isLeapYear = (year: number) => year % 4 === 0;
const monthWith31Days = [1, 3, 5, 7, 8, 10, 12];

const getLastDateInMonth = (month: number, year: number) => {
  month < 1 && (month += 12) && year--;
  month > 12 && (month -= 12) && year++;
  if (monthWith31Days.includes(month)) {
    return 31;
  }
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return 30;
};

// Fill the 6 (or 5) x 7 array (Calendar with 6 (or 5) rows and 7 columns)
const getDatesOfMonth = (columnOfFirstDay: number, month: number, year: number): number[][] => {
  const lastDateOfLastMonth = getLastDateInMonth(month - 1, year);
  const lastDateOfThisMonth = getLastDateInMonth(month, year);

  const numberOfRows = columnOfFirstDay + lastDateOfThisMonth > 35 ? 6 : 5;

  const datesOfMonthFromFirstDay = Array.from({ length: numberOfRows * 7 - columnOfFirstDay }, (e, index) =>
    index + 1 > lastDateOfThisMonth ? index + 1 - lastDateOfThisMonth : index + 1
  );
  const datesBeforeFirstDay = Array.from(
    { length: columnOfFirstDay },
    (e, i) => i - columnOfFirstDay + 1 + lastDateOfLastMonth
  );

  return chunk([...datesBeforeFirstDay, ...datesOfMonthFromFirstDay], 7);
};

const getNewDate = () => {
  const { day, date, month, year } = today;

  const columnOfFirstDay = day - ((date - 1) % 7); // (today's column) - ((distance between today and the first day) % 7 to pass all the full row(s))

  let current = {
    currentMonth: month,
    currentYear: year,
    datesOfCurrentMonth: getDatesOfMonth(columnOfFirstDay > 0 ? columnOfFirstDay : 7 + columnOfFirstDay, month, year),
  };

  return (f: typeof getNextMonth | typeof getPreviousMonth): CurrentCalendarMonth => {
    current = f(current);
    return current;
  };
};

const getNextMonth = (current: CurrentCalendarMonth): CurrentCalendarMonth => {
  const { currentYear, currentMonth, datesOfCurrentMonth } = current;

  const nextMonth = currentMonth + 1;
  const year = nextMonth > 12 ? currentYear + 1 : currentYear;
  const columnOfFirstDay = datesOfCurrentMonth[datesOfCurrentMonth.length - 1].indexOf(1);

  return {
    ...current,
    currentMonth: nextMonth > 12 ? nextMonth - 12 : nextMonth,
    currentYear: year,
    datesOfCurrentMonth: getDatesOfMonth(columnOfFirstDay >= 0 ? columnOfFirstDay : 0, nextMonth, year),
  };
};

const getPreviousMonth = (current: CurrentCalendarMonth): CurrentCalendarMonth => {
  const { currentMonth, currentYear, datesOfCurrentMonth } = current;

  const previousMonth = currentMonth - 1;
  const year = previousMonth < 1 ? currentYear - 1 : currentYear;

  const lastDateOfLastMonth = getLastDateInMonth(previousMonth, year);
  let positionOfLastDate = datesOfCurrentMonth[0].indexOf(lastDateOfLastMonth);
  positionOfLastDate = positionOfLastDate < 0 ? 6 : positionOfLastDate;

  let columnOfFirstDay = positionOfLastDate - ((lastDateOfLastMonth - 1) % 7);
  columnOfFirstDay = columnOfFirstDay > 0 ? columnOfFirstDay : 7 + columnOfFirstDay;

  return {
    ...current,
    currentMonth: previousMonth < 1 ? previousMonth + 12 : previousMonth,
    currentYear: year,
    datesOfCurrentMonth: getDatesOfMonth(columnOfFirstDay, previousMonth, year),
  };
};

const getDates = getNewDate();

const isToday = (date: number, month: number, year: number) =>
  date === today.date && month === today.month && year === today.year;

const isPreviousDate = (currentDate: CurrentCalendarMonth, row: number, column: number, date: number) => {
  const { currentMonth, currentYear, datesOfCurrentMonth } = currentDate;
  if ((currentMonth > today.month && currentYear === today.year) || currentYear > today.year) return false;

  const todayIndex = datesOfCurrentMonth.reduce((acc, currentRow) => [...acc, ...currentRow], []).indexOf(today.date);
  const todayRow = Math.ceil(todayIndex / 7) - 1;

  return (
    row < todayRow || (today.date < 6 && row === 0 && column < today.day) || (row === todayRow && date < today.date)
  );
};

export {
  deliveryHours,
  monthLong,
  monthShort,
  daysOfWeek,
  getDates,
  getNextMonth,
  getPreviousMonth,
  today,
  daysOfWeekLong,
  isToday,
  isPreviousDate,
};
