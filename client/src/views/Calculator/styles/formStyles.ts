import { makeStyles } from '@material-ui/core';

export const useFormStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    borderRadius: 4,
    border: '1px #131921 solid',
    backgroundColor: '#fff',
    padding: 32,
    maxWidth: 700,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },

  formTitle: {
    width: 'fit-content',
  },

  form: {
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
  },

  submitBtn: {
    margin: '16px 0',
    padding: 8,
    backgroundColor: '#131921',
    color: 'white',
    fontSize: '1.25rem',
    '& :hover': {
      color: '#131921',
    },
  },

  formFooter: {
    width: 300,
    padding: '16px 0',
    '& :hover': {
      color: '#858585',
      textDecoration: 'underline',
    },
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },

  errorText: {
    color: 'red',
    padding: 4,
  },
}));
