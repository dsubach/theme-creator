import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    inputRoot: {
      display: 'flex',
      alignItems: 'center',
    },
    switchBase: {
      color: '#fff',
    },
  }),
);
