import React, { useCallback } from 'react';
import { Typography, Switch } from '@material-ui/core';
import { setThemeOption } from 'src/state/actions';
import { useThemeValue } from 'src/state/selectors';
import { ThemeValueChangeEvent } from '../../events';
import { useAppDispatch } from 'src/state/hooks';
import { useStyles } from './ThemeTypeInput.styles';

export const ThemeTypeInput = () => {
  const classes = useStyles();
  const themeIsDark = useThemeValue('palette.type') === 'dark';
  const dispatch = useAppDispatch();

  const toggleThemeType = useCallback(() => {
    dispatch(setThemeOption('palette.type', themeIsDark ? 'light' : 'dark'));
    document.dispatchEvent(ThemeValueChangeEvent());
  }, [dispatch, themeIsDark]);

  return (
    <div className={classes.inputRoot}>
      <Typography variant="body2" color={themeIsDark ? 'textSecondary' : 'textPrimary'}>
        Light1
      </Typography>
      <Switch
        checked={themeIsDark}
        onClick={toggleThemeType}
        classes={{
          switchBase: classes.switchBase,
        }}
        color="default"
      />
      <Typography variant="body2" color={!themeIsDark ? 'textSecondary' : 'textPrimary'}>
        Dark
      </Typography>
    </div>
  );
};
