import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    errorItem: {
      position: 'relative',
      bottom: 0,
    },
    alertRoot: {
      alignItems: 'flex-end',
      width: '100%',
    },
    alertIcon: {
      padding: 0,
    },
    alertMessage: {
      padding: '4px 0',
      flexGrow: 1,
    },
    alertDivider: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
    },
    errorLine: {
      fontWeight: theme.typography.fontWeightBold,
    },
    expandIcon: {
      transition: theme.transitions.create('transform'),
      '&$expanded': {
        transform: 'rotate(180deg)',
      },
    },
    expanded: {},
  }),
);
