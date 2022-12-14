import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useStyles } from './LetterSpacingInput.styles';
import { IInputProps } from '../types';

const getLetterSpacingValue = (letterSpacing: string) => {
  if (letterSpacing == null || letterSpacing.endsWith('rem') || !letterSpacing.endsWith('em')) {
    return undefined;
  }
  return parseFloat(letterSpacing.slice(0, -2));
};

function LetterSpacingInput({ value, onChange }: IInputProps) {
  const classes = useStyles();
  const [displayValue, setDisplayValue] = useState<number | number[] | undefined>(undefined);

  useEffect(() => setDisplayValue(getLetterSpacingValue(value)), [value]);

  const disabled = displayValue == undefined;

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            Letter Spacing:
          </Typography>
        </Grid>
        <Grid item>
          {!disabled && <Typography display="inline">{`${displayValue}em`}</Typography>}
        </Grid>
      </Grid>
      <Slider
        value={disabled ? 0 : displayValue}
        disabled={disabled}
        min={-0.1}
        max={1.5}
        step={0.01}
        onChange={(event, newDisplayValue) => setDisplayValue(newDisplayValue)}
        onChangeCommitted={(event, newValue) => onChange(event, `${newValue}em`)}
      />
      {disabled && (
        <Typography color="textSecondary" variant="caption" className={classes.disabledText}>
          Only em units supported. Use the code editor to configure other types.
        </Typography>
      )}
    </>
  );
}

export default LetterSpacingInput;
