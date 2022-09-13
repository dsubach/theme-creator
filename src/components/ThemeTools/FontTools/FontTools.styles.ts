import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popularFontList: {
      flexDirection: 'column',
    },
    loadedFontContent: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
      maxHeight: 200,
      overflowY: 'auto',
    },
  }),
);
