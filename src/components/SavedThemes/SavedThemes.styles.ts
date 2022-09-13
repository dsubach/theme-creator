import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    savedThemesRoot: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    savedThemes: {
      flex: 1,
    },
    divider: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    themeActions: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(2),
      '& > *': {
        marginTop: theme.spacing(),
      },
    },
  }),
);
