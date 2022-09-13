import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  appRoot: {
    display: 'flex',
    height: '100vh',
  },
  headerNavAndMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  navAndMain: {
    flex: 1,
    display: 'flex',
    minHeight: 0,
  },
  main: {
    minWidth: 0,
    minHeight: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#000000',
    [theme.breakpoints.up('md')]: {
      position: 'static',
    },
  },
}));
