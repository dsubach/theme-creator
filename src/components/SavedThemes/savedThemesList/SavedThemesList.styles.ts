import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    savedThemeContainer: {
      margin: theme.spacing(2),
      marginTop: 0,
    },
  }),
);
