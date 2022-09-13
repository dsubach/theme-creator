import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accordionSummary: {
      position: 'sticky',
      top: 0,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.drawer + 3,
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
    },
    accordionSummaryContent: {
      maxWidth: '100%',
      overflow: 'auto',
    },
    accordionDetails: {
      flexDirection: 'column',
      '&> *': {
        marginBottom: theme.spacing(2),
      },
    },
  }),
);
