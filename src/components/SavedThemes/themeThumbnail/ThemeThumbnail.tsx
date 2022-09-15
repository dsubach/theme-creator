import React, { useEffect, useState } from 'react';
import { Theme } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { IThemeThumbnailProps } from './types';
import { useStyles } from './ThemeThumbnail.styles';

export const ThemeThumbnail = ({ themeOptions, large = false }: IThemeThumbnailProps) => {
  const classes = useStyles();
  const [themeObject, setThemeObject] = useState<Theme>({} as Theme);

  useEffect(() => setThemeObject(createTheme(themeOptions)), [themeOptions]);

  const { background, primary, secondary, text } = themeObject?.palette || {};

  return (
    <div
      className={`${classes.root} ${large ? 'large' : null}`}
      style={{
        backgroundColor: background?.default,
        color: text?.primary,
      }}
    >
      <div className={classes.appBar} style={{ backgroundColor: primary?.main }}>
        <span style={{ color: primary?.contrastText }}>Title</span>
      </div>
      <span className={classes.contentTitle}>Content</span>
      <div className={classes.card} style={{ backgroundColor: background?.paper }}>
        <div className={classes.cardHeader}>Card Header</div>
        <div className={classes.cardSubheader} style={{ color: text?.secondary }}>
          Card Subheader
        </div>
      </div>
      <div
        className={classes.fab}
        style={{
          backgroundColor: secondary?.main,
          color: secondary?.contrastText,
        }}
      >
        <AddIcon className={classes.fabIcon} />
      </div>
    </div>
  );
};
