import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    resetButton: {
      textTransform: 'capitalize',
    },
    disabledButton: {
      fontStyle: 'italic',
    },
  }),
);