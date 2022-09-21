import React, { useCallback } from 'react';
import { setThemeOption, removeThemeOption } from 'src/state/actions';
import { Grid, Button } from '@material-ui/core';
import { useThemeValueInfo } from 'src/state/selectors';
import { useAppDispatch } from 'src/state/hooks';
import { ColorInput } from 'src/components/colorInput/ColorInput';
import { useStyles } from './PaletteInput.styles';
import { IPaletteInputPropss } from './types';

export const PaletteInput = ({ label, path }: IPaletteInputPropss) => {
  const classes = useStyles();
  const themeValueInfo = useThemeValueInfo(path);
  const dispatch = useAppDispatch();

  const handleColorChange = useCallback(
    (color: string) => dispatch(setThemeOption(path, color)),
    [dispatch],
  );

  const handleReset = useCallback(() => dispatch(removeThemeOption(path)), [dispatch]);

  return (
    <Grid container justifyContent="space-between" alignItems="flex-end">
      <Grid item>
        <ColorInput label={label} color={themeValueInfo.value} onColorChange={handleColorChange} />
      </Grid>
      <Grid item>
        <Button
          size="small"
          disabled={!themeValueInfo.modifiedByUser}
          classes={{
            root: classes.resetButton,
            disabled: classes.disabledButton,
          }}
          onClick={handleReset}
        >
          {themeValueInfo.modifiedByUser ? 'Reset' : 'auto'}
        </Button>
      </Grid>
    </Grid>
  );
};
