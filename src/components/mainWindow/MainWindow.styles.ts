import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    mainWindow: {
      overflowY: 'auto',
      height: '100%',
    },
    navAppBar: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    componentsTabRoot: {
      backgroundColor: '#fff', // ensures transparent colors show properly
    },
    tabs: {
      flexGrow: 1,
    },
    tabFlexContainer: {
      justifyContent: 'center',
    },
  }),
);
