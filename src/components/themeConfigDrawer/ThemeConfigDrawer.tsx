import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import ThemeTools from '../ThemeTools/ThemeTools';
import MonacoThemeCodeEditor from 'src/components/MonacoThemeCodeEditor';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { toggleThemeConfig } from 'src/state/reducers';

const drawerWidth: React.CSSProperties['width'] = 400;

const useStyles = makeStyles((theme) => ({
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

const ThemeConfigDrawer = () => {
  const classes = useStyles();
  const themeId = useAppSelector((state) => state.themeId);
  const open = useAppSelector((state) => state.themeConfigOpen);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const permanent = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Drawer
      variant={permanent ? 'permanent' : 'temporary'}
      anchor="right"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      onClose={() => dispatch(toggleThemeConfig())}
    >
      <Grid container direction="column" wrap="nowrap" className={classes.drawerContainer}>
        <Grid item className={classes.editorWrapper}>
          {/* Use themeId as key so that editor is torn down and rebuilt with new theme */}
          <MonacoThemeCodeEditor key={themeId} />
        </Grid>

        <Grid item className={classes.controlsWrapper}>
          <ThemeTools />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default ThemeConfigDrawer;
