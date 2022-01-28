import { makeStyles } from '@material-ui/core';

export const useTimeSelectStyles = makeStyles(() => ({
  root: {
    padding: '12px 0',
  },

  label: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.00938em',
    padding: '0 0 8px 8px',
  },

  select: {
    fontSize: '18px',
    borderRadius: 4,
    backgroundColor: 'inherit',
  },

  option: {},
}));
