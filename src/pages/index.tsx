import React from 'react';

import ComponentNavDrawer from 'src/components/componentNavDrawer/ComponentNavDrawer';
import Layout from 'src/components/layout/Layout';
import { MainWindow } from 'src/components/mainWindow/MainWindow';
import { SmallScreenWarning } from 'src/components/smallScreenWarning/SmallScreenWarning';
import ThemeConfigDrawer from 'src/components/themeConfigDrawer/ThemeConfigDrawer';
import ErrorBoundary from 'src/components/errorBoundary/ErrorBoundary';
import { useStyles } from './styles';

const IndexPage = () => {
  const classes = useStyles();
  return (
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
  );
};

export default IndexPage;
