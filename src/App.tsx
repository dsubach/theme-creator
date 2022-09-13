import React from 'react';

import { makeStyles } from '@material-ui/core';

import ComponentNavDrawer from 'src/components/componentNavDrawer/ComponentNavDrawer';
import Layout from 'src/components/layout/Layout';
import { MainWindow } from 'src/components/mainWindow/MainWindow';
import { SmallScreenWarning } from 'src/components/smallScreenWarning/SmallScreenWarning';
import ThemeConfigDrawer from 'src/components/themeConfigDrawer/ThemeConfigDrawer';
import ErrorBoundary from 'src/components/errorBoundary/ErrorBoundary';
import { persistor, store } from './state/createStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const useStyles = makeStyles((theme) => ({
  appRoot: {
    display: 'flex',
    height: '100vh',
  },
  headerNavAndMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  navAndMain: {
    flex: 1,
    display: 'flex',
    minHeight: 0,
  },
  main: {
    minWidth: 0,
    minHeight: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#000000',
    [theme.breakpoints.up('md')]: {
      position: 'static',
    },
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <div className={classes.appRoot}>
            <ErrorBoundary>
              <div className={classes.headerNavAndMain}>
                <div className={classes.navAndMain}>
                  <ComponentNavDrawer />

                  <main className={classes.main}>
                    <MainWindow />
                  </main>
                </div>
              </div>

              <ThemeConfigDrawer />
            </ErrorBoundary>
          </div>
          <SmallScreenWarning />
        </Layout>
      </PersistGate>
    </Provider>
  );
};

export default App;
