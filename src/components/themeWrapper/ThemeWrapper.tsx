import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useAppSelector } from 'src/state/hooks';
import { useStyles } from './ThemeWrapper.styles';
import { IThemeWrapperProps } from './types';

/**
 *
 * Wraps example content in the dynamically controlled theme
 * set by the theme editor sidebar
 */
export const ThemeWrapper = ({ children }: IThemeWrapperProps) => {
  const themeObject = useAppSelector((state) => state.themeObject);

  return (
    <ThemeProvider theme={themeObject}>
      <ThemeContainer>{children}</ThemeContainer>
    </ThemeProvider>
  );
};

const ThemeContainer = ({ children }: ThemeWrapperProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.themeContainer} elevation={0} square>
      {children}
    </Paper>
  );
};
