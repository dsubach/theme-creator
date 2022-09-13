import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paletteContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: '1.5em',
      '&$colorType': {
        alignItems: 'flex-end',
      },
    },
    colorItem: {
      transition: theme.transitions.create('height'),
    },
  }),
);
