import { makeStyles } from '@material-ui/core';

export const useResultSummaryStyles = makeStyles(() => ({
  root: {
    padding: 20,
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
    boxShadow: 'rgb(0 0 0 / 6%) 0px 0px 0.125rem 0px, rgb(0 0 0 / 12%) 0px 0.125rem 0.125rem 0px',
  },

  title: {
    textAlign: 'center',
    fontSize: 28,
    padding: 16,
    fontFamily: 'Righteous',
    color: '#70757a',
  },

  charge: {
    padding: '12px 16px',
    color: '#70757a',
    fontWeight: 500,
  },

  totalStyle: {
    padding: '16px 16px 24px 16px',
    fontWeight: 600,
  },
}));
