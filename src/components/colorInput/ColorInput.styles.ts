import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    popoverPaper: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 0,
      alignItems: 'center',
    },
    colorSampleAdornment: {
      width: '1em',
      height: '1em',
      border: '1px solid grey',
    },
  }),
);
