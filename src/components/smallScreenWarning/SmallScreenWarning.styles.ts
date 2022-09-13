import { makeStyles, Theme, createStyles, darken } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogPaper: {
      backgroundColor: darken(theme.palette.error.dark, 0.5),
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    exitButtonArea: {
      textAlign: 'center',
      marginBottom: 32,
      '& > *': {
        fontFamily: '"Press Start 2P"',
      },
    },
  }),
);
