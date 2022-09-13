import React, { useCallback } from 'react';
import { Button, ButtonBase, Grid, Popover, Typography } from '@material-ui/core';
import { useAppDispatch } from 'src/state/hooks';
import { addNewDefaultTheme } from 'src/state/actions';
import { NewSavedTheme } from 'src/state/types';
import defaultThemesList from '../savedThemesList/themesList';
import { ThemeThumbnail } from '../themeThumbnail/ThemeThumbnail';
import { useStyles } from './DefaultThemes.styles';

export const defaultThemesId = 'default-themes';

export const DefaultThemes = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickTheme = useCallback(
    (newTheme: Omit<NewSavedTheme, 'lastUpdated'>) => {
      dispatch(addNewDefaultTheme(newTheme));
    },
    [dispatch],
  );

  const open = Boolean(anchorEl);
  const popoverId = open ? 'default-themes-popover' : undefined;

  return (
    <>
      <Button id={defaultThemesId} variant="outlined" onClick={handleClickButton}>
        Example Templates
      </Button>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        classes={{ paper: classes.templatePopover }}
      >
        <Grid container spacing={2} wrap="nowrap" className={classes.templateContainer}>
          {defaultThemesList.map((t) => (
            <Grid item key={t.name} onClick={() => handleClickTheme(t)}>
              <ButtonBase className={classes.buttonRoot}>
                <div className={classes.thumbnailContainer}>
                  <ThemeThumbnail themeOptions={t.themeOptions} />
                  <div className={classes.hoverArea}>
                    <Typography>Click to add</Typography>
                  </div>
                </div>

                <Typography variant="subtitle1">{t.name}</Typography>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Popover>
    </>
  );
};
