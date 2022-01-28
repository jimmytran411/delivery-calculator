import { createTheme, makeStyles } from '@material-ui/core';

export const useCalendarStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#313035',
    // color: 'white',
    width: 420,
    height: 420,
    padding: 8,
    [theme.breakpoints.down('xs')]: {
      width: 330,
    },
  },

  top: {
    padding: 15,
    fontSize: 18,
  },

  header: {
    fontWeight: 500,
  },

  btnGroup: {
    padding: '0 15px',
    alignSelf: 'center',
  },

  headerBtn: {
    borderRadius: '50%',
  },

  dateMonth: {
    padding: 15,
  },

  table: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
    textAlign: 'center',
  },

  headerCell: {
    display: 'table-cell',
    fontSize: 20,
    fontWeight: 500,
    verticalAlign: 'middle',
    color: '#70757a',
    padding: 8,
  },

  tableContent: {
    display: 'table-row-group',
  },

  row: {
    display: 'table-row',
    height: 28,
  },

  cell: {
    display: 'table-cell',
    fontSize: 16,
    fontWeight: 500,
    verticalAlign: 'middle',
    color: '#70757a',
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    padding: 12,
    borderRadius: '50%',
    '&:hover': {
      fontWeight: 700,
      textDecoration: 'underline',
    },
  },

  todayStyle: {
    textDecoration: 'underline',
    fontWeight: 600,
  },

  pastDay: {
    color: theme.palette.action.disabled,
    cursor: 'default',
    '&:hover': {
      opacity: 1,
    },
  },

  selectDateStyle: {
    fontWeight: 700,
    textDecoration: 'underline',
  },
}));

export const theme = createTheme({
  overrides: {
    MuiMenu: {
      paper: {
        // backgroundColor: '#313035',
        borderRadius: 8,
      },
      list: {
        padding: 0,
      },
    },
  },
});
