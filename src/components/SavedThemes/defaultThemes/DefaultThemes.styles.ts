import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonRoot: {
      display: 'flex',
      flexDirection: 'column',
    },
    thumbnailContainer: {
      position: 'relative',
      '&:hover $hoverArea': {
        display: 'flex',
      },
    },
    hoverArea: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backdropFilter: 'blur(2px) saturate(30%) brightness(40%)',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'none',
    },
    templatePopover: {
      padding: theme.spacing(2),
    },
    templateContainer: {
      flex: 1,
      flexGrow: 1,
      overflowX: 'auto',
    },
  }),
);
