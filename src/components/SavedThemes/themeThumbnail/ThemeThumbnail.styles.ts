import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 100,
      maxWidth: '85vw',
      width: 1600 / 9,
      position: 'relative',
      '&.large': {
        height: 200,
        width: (1600 / 9) * 2,
        fontSize: 28,
        '& $fabIcon': {
          height: 36,
          width: 36,
        },
        '& $fab': {
          height: 32,
          width: 32,
          bottom: 8,
          right: 8,
        },
      },
    },
    appBar: {
      height: '15%',
      width: '100%',
      paddingLeft: 4,
      fontSize: '75%',
    },
    contentTitle: {
      fontSize: '60%',
      paddingLeft: 4,
    },
    card: {
      height: '50%',
      margin: 4,
    },
    cardHeader: {
      fontSize: '55%',
    },
    cardSubheader: {
      fontSize: '45%',
    },
    fab: {
      height: 16,
      width: 16,
      borderRadius: '50%',
      position: 'absolute',
      bottom: 4,
      right: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fabIcon: {
      height: 18,
      width: 18,
    },
  }),
);
