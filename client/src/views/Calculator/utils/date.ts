interface CurrentDate {
  currentMonth: number;
  currentYear: number;
  dates: number[][];
}

// assumming working hours from 10:00 to 2:00 of next day
const deliveryHours = Array.from(
  {
    length: 16,
  },
  (e, i) => `${i + 10 >= 24 ? i + 10 - 24 : i + 10}:00 - ${i + 11 >= 24 ? i + 11 - 24 : i + 11}:00`
);
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
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
const getDatesOfMonth = (positionOfFirstDay: number, month: number, year: number): number[][] => {
  const lastDateOfLastMonth = getLastDateInMonth(month - 1, year);
  const lastDateOfThisMonth = getLastDateInMonth(month, year);

  const firstRow = Array.from(
    {
      length: 7,
    },
    (e, index) => {
      const date = 1 + index - positionOfFirstDay;

      return date > 0 ? date : lastDateOfLastMonth + date;
    }
  );

  const dates = Array.from(
    {
      length: 6,
    },
    (e, index) =>
      firstRow.map((date) => {
        date = date + index * 7;
        if (date > lastDateOfLastMonth + lastDateOfThisMonth) {
          return date - (lastDateOfLastMonth + lastDateOfThisMonth);
        }
        if (date > lastDateOfLastMonth) {
          return date - lastDateOfLastMonth;
        }
        return date;
      })
  );

  dates[5].indexOf(1) < 0 && dates.pop();

  return dates;
};

const getNewDate = () => {
  const { day, date, month, year } = today;

  let positionOfFirstDay = day - ((date - 1) % 7); // (today's column) - ((distance between today and the first day) % 7 to pass all the full row(s))
  positionOfFirstDay = positionOfFirstDay > 0 ? positionOfFirstDay : 7 + positionOfFirstDay;

  let current = {
    currentMonth: month,
    currentYear: year,
    dates: getDatesOfMonth(positionOfFirstDay, month, year),
  };

  return (f: any): CurrentDate => {
    current = f(current);
    return current;
  };
};

const getNextMonth = (current: CurrentDate): CurrentDate => {
  const { currentYear, currentMonth, dates } = current;

  let nextMonth = currentMonth + 1;
  const year = nextMonth > 12 ? currentYear + 1 : currentYear;
  nextMonth = nextMonth > 12 ? nextMonth - 12 : nextMonth;
  const positionOfFirstDay = dates[dates.length - 1].indexOf(1);

  return {
    ...current,
    currentMonth: nextMonth,
    currentYear: year,
    dates: getDatesOfMonth(positionOfFirstDay >= 0 ? positionOfFirstDay : 0, nextMonth, year),
  };
};

const getPreviousMonth = (current: CurrentDate): CurrentDate => {
  const { currentMonth, currentYear, dates } = current;

  let previousMonth = currentMonth - 1;
  const year = previousMonth < 1 ? currentYear - 1 : currentYear;
  previousMonth = previousMonth < 1 ? previousMonth + 12 : previousMonth;

  const lastDateOfLastMonth = getLastDateInMonth(previousMonth, year);
  let positionOfLastDate = dates[0].indexOf(lastDateOfLastMonth);
  positionOfLastDate = positionOfLastDate < 1 ? 6 : positionOfLastDate;

  let positionOfFirstDay = positionOfLastDate - ((lastDateOfLastMonth - 1) % 7);
  positionOfFirstDay = positionOfFirstDay > 0 ? positionOfFirstDay : 7 + positionOfFirstDay;

  return {
    ...current,
    currentMonth: previousMonth,
    currentYear: year,
    dates: getDatesOfMonth(positionOfFirstDay, previousMonth, year),
  };
};

const getDates = getNewDate();

export { deliveryHours, monthLong, monthShort, daysOfWeek, getDates, getNextMonth, getPreviousMonth, today };
