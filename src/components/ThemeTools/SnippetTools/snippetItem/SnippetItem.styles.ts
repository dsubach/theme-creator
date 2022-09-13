import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snippetTitle: {
      marginLeft: theme.spacing(),
      flexGrow: 1,
    },
  }),
);
