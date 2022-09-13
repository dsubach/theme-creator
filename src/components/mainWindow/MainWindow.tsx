import React, { useCallback } from 'react';
import ThemeWrapper from 'src/components/themeWrapper/ThemeWrapper';
import { AppBar, Tabs, Tab, IconButton, Hidden } from '@material-ui/core';
import { MuiComponentSamples } from 'src/components/MuiComponentSamples/MuiComponentSamples';
import SavedThemes from 'src/components/SavedThemes/SavedThemes';
import { setTab, toggleComponentNav, toggleThemeConfig } from 'src/state/reducers';
import MaterialUiIcon from 'mdi-material-ui/MaterialUi';
import BrushIcon from '@material-ui/icons/Brush';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { useStyles } from './MainWindow.styles';

export const componentsTabId = 'components-tab';
export const savedThemesTabId = 'saved-themes-tab';

export const MainWindow = () => {
  const classes = useStyles();
  const activeTab = useAppSelector((state) => state.activeTab);
  const dispatch = useAppDispatch();
  const setActiveTab = useCallback((value: string) => dispatch(setTab(value)), [dispatch]);

  return (
    <>
      <AppBar position="sticky" color="default" className={classes.navAppBar}>
        <Hidden lgUp>
          <IconButton onClick={() => dispatch(toggleComponentNav())}>
            <MaterialUiIcon />
          </IconButton>
        </Hidden>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          onChange={(event, value) => setActiveTab(value)}
          classes={{
            root: classes.tabs,
            flexContainer: classes.tabFlexContainer,
          }}
        >
          <Tab label="Components" value="components" id={componentsTabId} />
          <Tab label="Saved Themes" value="saved" id={savedThemesTabId} />
        </Tabs>
        <Hidden smUp>
          <IconButton onClick={() => dispatch(toggleThemeConfig())}>
            <BrushIcon />
          </IconButton>
        </Hidden>
      </AppBar>
      <div className={classes.mainWindow}>
        {activeTab === 'components' && (
          <div className={classes.componentsTabRoot}>
            <ThemeWrapper>
              <MuiComponentSamples />
            </ThemeWrapper>
          </div>
        )}

        {activeTab === 'saved' && <SavedThemes />}
      </div>
    </>
  );
};
