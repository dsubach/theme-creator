import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editorControlRoot: {
      paddingRight: theme.spacing(),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    editorControlActions: {
      display: 'flex',
    },
  }),
);
