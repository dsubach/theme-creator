import React from 'react';
import { Grid } from '@material-ui/core';
import { SavedThemeItem } from '../savedThemeItem/SavedThemeItem';
import { useStyles } from './SavedThemesList.styles';
import { useAppSelector } from 'src/state/hooks';

export const savedThemeListId = 'saved-theme-list';

export const SavedThemeList = () => {
  const classes = useStyles();
  const savedThemes = useAppSelector((state) => state.savedThemes);
  const sortedThemes = Object.values(savedThemes).sort((a, b) =>
    a.lastUpdated > b.lastUpdated ? -1 : a.lastUpdated < b.lastUpdated ? 1 : 0,
  );

  return (
    <Grid id={savedThemeListId} container wrap="wrap" justifyContent="center">
      {sortedThemes.map((t) => (
        <Grid item key={`${t.name}-${t.id}`} className={classes.savedThemeContainer}>
          <SavedThemeItem
            name={t.name}
            themeOptions={t.themeOptions}
            themeId={t.id}
            lastUpdated={t.lastUpdated}
          />
        </Grid>
      ))}
    </Grid>
  );
};
