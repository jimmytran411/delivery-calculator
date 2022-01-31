import { identity } from 'lodash';
import { getDatesOfMonth, getCalendarMonth, getNextMonth, getPreviousMonth } from '../utils/date';

describe('Date functions test', () => {
  const month = 0;
  const year = 2022;
  const getDates = getCalendarMonth(month, year);
  test('it should get the dates of calendar given the first day of the calendar', () => {
    const dates = getDatesOfMonth(new Date(2021, 11, 31)).map((row) => row.map(({ date }) => date));
    expect(dates.length).toEqual(5);
    expect(dates).toEqual([
      [31, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, 1, 2, 3],
    ]);
  });

  test('it should get the calendar dates when create new getCalendarMonth', () => {
    const currentCalendarMonth = getDates(identity);
    const dates = currentCalendarMonth.datesOfCurrentMonth.map((row) => row.map(({ date }) => date));
    expect(dates).toEqual([
      [26, 27, 28, 29, 30, 31, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [30, 31, 1, 2, 3, 4, 5],
    ]);
  });

  test('it should get the calendar dates of next month', () => {
    const currentCalendarMonth = getDates(getNextMonth);
    const dates = currentCalendarMonth.datesOfCurrentMonth.map((row) => row.map(({ date }) => date));

    expect(currentCalendarMonth.currentMonth).toBe(month + 1);
    expect(currentCalendarMonth.currentYear).toBe(year);
    expect(dates).toEqual([
      [30, 31, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 1, 2, 3, 4, 5],
    ]);
  });

  test('it should get the calendar dates of previous month', () => {
    const currentCalendarMonth = getDates(getPreviousMonth);
    const dates = currentCalendarMonth.datesOfCurrentMonth.map((row) => row.map(({ date }) => date));

    expect(currentCalendarMonth.currentMonth).toBe(month);
    expect(currentCalendarMonth.currentYear).toBe(year);
    expect(dates).toEqual([
      [26, 27, 28, 29, 30, 31, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [30, 31, 1, 2, 3, 4, 5],
    ]);
  });
});
