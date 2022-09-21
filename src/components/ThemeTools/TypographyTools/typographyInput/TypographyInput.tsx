import React, { useCallback } from 'react';
import { setThemeOption, removeThemeOption } from 'src/state/actions';
import { Grid, Button } from '@material-ui/core';
import { useThemeValueInfo } from 'src/state/selectors';
import FontWeightInput from '../fontWeightInput/FontWeightInput';
import FontSizeInput from '../fontSizeInput/FontSizeInput';
import FontFamilyInput from '../fontFamilyInput/FontFamilyInput';
import LineHeightInput from '../lineHeightInput/LineHeightInput';
import LetterSpacingInput from '../letterSpacingInput/LetterSpacingInput';
import { ThemeValueChangeEvent } from '../../events';
import { useStyles } from './TypographyInput.styles';
import { ITypographyInput } from './types';
import { useAppDispatch } from 'src/state/hooks';
import { IInputProps } from '../types';

export const TypographyInput = ({ variantPath, property }: ITypographyInput) => {
  const classes = useStyles();
  const path = `${variantPath}.${property}`;
  const themeValueInfo = useThemeValueInfo(path);
  const dispatch = useAppDispatch();

  const handleValueChange = useCallback(
    (event, value) => {
      dispatch(setThemeOption(path, value));
      document.dispatchEvent(ThemeValueChangeEvent());
    },
    [dispatch],
  );

  const handleReset = useCallback(() => dispatch(removeThemeOption(path)), [dispatch]);

  return (
    <Grid container justifyContent="space-between" alignItems="baseline">
      <Grid item className={classes.inputContainer}>
        <TypographyPropertyInput
          property={property}
          value={themeValueInfo.value}
          onChange={handleValueChange}
        />
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

function TypographyPropertyInput({ property, ...props }: IInputProps) {
  switch (property) {
    case 'fontFamily':
      return <FontFamilyInput {...props} />;
    case 'htmlFontSize':
    case 'fontSize':
      return <FontSizeInput {...props} property={property} />;
    case 'fontWeight':
    case 'fontWeightLight':
    case 'fontWeightMedium':
    case 'fontWeightRegular':
    case 'fontWeightBold':
      return <FontWeightInput {...props} property={property} />;
    case 'letterSpacing':
      return <LetterSpacingInput {...props} />;
    case 'lineHeight':
      return <LineHeightInput {...props} />;
    default:
      return <div></div>;
  }
}
