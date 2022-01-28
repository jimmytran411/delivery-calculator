import { makeStyles } from '@material-ui/core';

export const useFormStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    margin: '0 auto',
    borderRadius: 16,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },

  formTitle: {
    fontSize: '2rem',
    paddingBottom: 20,
    fontWeight: 500,
    fontFamily: "'Righteous', cursive",
    color: '#6ae7fd',
  },

  left: {
    margin: '0 auto',
    padding: 32,
    maxWidth: 700,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },

  form: {
    padding: 48,
    [theme.breakpoints.down('xs')]: {
      padding: 24,
    },
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
    boxShadow: 'rgb(0 0 0 / 6%) 0px 0px 0.125rem 0px, rgb(0 0 0 / 12%) 0px 0.125rem 0.125rem 0px',
  },

  inputField: {
    padding: '12px 0',
  },

  submitBtn: {
    padding: 16,
    backgroundColor: '#009de0',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 500,
    fontFamily: "'Righteous'",
    borderRadius: 8,
    margin: '0 auto',
    marginTop: 24,
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
  },

  errorText: {
    color: 'red',
    padding: 4,
  },

  right: {
    padding: 16,
    alignSelf: 'center',
  },
}));
