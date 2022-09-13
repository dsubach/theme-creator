import { CSSProperties } from 'React';
import { makeStyles, Theme } from '@material-ui/core';

const drawerWidth: CSSProperties['width'] = 400;

export const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    height: '100vh',
    maxWidth: '90vw',
  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: 'visible',
    zIndex: theme.zIndex.drawer + 2,
    maxWidth: '90vw',
  },
  editorWrapper: {
    flexGrow: 1,
    minHeight: '30vh',
    maxHeight: '50vh',
    height: '100%',
  },
  controlsWrapper: {
    minHeight: '30vh',
    height: '100%',
  },
  drawerContainer: {
    height: '100vh',
  },
}));
