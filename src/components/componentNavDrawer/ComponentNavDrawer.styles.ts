import { makeStyles, Theme } from '@material-ui/core';

const drawerWidth: React.CSSProperties['width'] = 200;

export const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  list: {
    // gives background to the sticky header
    backgroundColor: theme.palette.background.paper,
  },
  listItemText: {
    paddingLeft: theme.spacing(2),
  },
}));
