import React, { useCallback, MouseEvent } from 'react';
import moment from 'moment';

import { Button, Card, Typography } from '@material-ui/core';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

import { loadSavedTheme } from 'src/state/actions';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { ThemeThumbnail } from '../themeThumbnail/ThemeThumbnail';
import { DeleteThemeButton } from '../deteleThemeButton/DeleteThemeButton';
import RenameThemeButton from '../renameThemeButton/RenameThemeButton';
import { ISavedThemeItemProps } from './types';
import { useStyles } from './SavedThemeItem.styles';

export const SavedThemeItem = ({
  name,
  themeId,
  lastUpdated,
  ...thumbnailProps
}: ISavedThemeItemProps) => {
  const classes = useStyles();
  const loadedThemeId = useAppSelector((state) => state.themeId);
  const dispatch = useAppDispatch();

  const handleLoadTheme = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      dispatch(loadSavedTheme(themeId));
    },
    [dispatch],
  );

  return (
    <div className={classes.root} onClick={handleLoadTheme}>
      <Card className={`${themeId === loadedThemeId ? classes.loadedCard : ''}`}>
        <div className={classes.savedItemContent}>
          <Typography variant="subtitle1" align="center">
            {name}
          </Typography>
          <ThemeThumbnail {...thumbnailProps} />
          <Typography variant="caption" component="p" align="center">{`Last Updated: ${moment(
            lastUpdated,
          ).fromNow()}`}</Typography>
        </div>
      </Card>
      <div className={classes.hoverArea}>
        <div className={classes.hoverAreaActions}>
          <Button
            size="large"
            disabled={themeId === loadedThemeId}
            startIcon={<SwapHorizIcon />}
            onClick={handleLoadTheme}
          >
            Load
          </Button>
          <RenameThemeButton themeId={themeId} defaultName={name} />
          <DeleteThemeButton
            themeId={themeId}
            themeName={name}
            disabled={themeId === loadedThemeId}
          />
        </div>
      </div>
    </div>
  );
};
