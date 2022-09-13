import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      '&:hover $hoverArea': {
        display: 'flex',
      },
    },
    savedItemContent: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    loadedCard: {
      backgroundColor: '#9e9e9e',
      color: '#000',
    },
    hoverArea: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backdropFilter: 'blur(2px) saturate(30%) brightness(40%)',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'none',
    },
    hoverAreaActions: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'baseline',
    },
  }),
);
