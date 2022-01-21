import { makeStyles } from '@material-ui/core';

export const useCalendarStyles = makeStyles(() => ({
  dateStyle: {
    '&:hover': {
      border: '1px solid black',
      cursor: 'pointer',
    },
  },

  todayStyle: {
    border: '1px solid black',
    borderRadius: 8,
  },
}));
