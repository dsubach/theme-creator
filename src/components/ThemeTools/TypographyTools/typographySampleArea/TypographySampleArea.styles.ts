import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sampleAreaRoot: {
      overflow: 'auto',
      maxHeight: 200,
      paddingLeft: 4,
    },
    sampleAreaPaper: {
      padding: theme.spacing(0.5),
    },
    text: {
      transition: theme.transitions.create('font-size'),
    },
    smallText: {
      // used when the variant is minimized
      fontSize: '1rem',
    },
  }),
);
