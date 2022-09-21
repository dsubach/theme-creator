import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { IInputProps } from '../types';

const titles = {
  fontWeight: 'Font Weight',
  fontWeightLight: 'Font Weight Light',
  fontWeightRegular: 'Font Weight Regular',
  fontWeightMedium: 'Font Weight Medium',
  fontWeightBold: 'Font Weight Bold',
};

function FontWeightInput({ value, onChange, property }: Required<IInputProps>) {
  const [displayValue, setDisplayValue] = useState<number | number[]>(Number(value));

  useEffect(() => setDisplayValue(Number(value)), [value]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="caption" color="textSecondary">{`${
            titles[property as keyof typeof titles]
          }:`}</Typography>
        </Grid>
        <Grid item>
          <Typography display="inline">{displayValue}</Typography>
        </Grid>
      </Grid>
      <Slider
        value={displayValue}
        min={100}
        max={1000}
        step={100}
        onChange={(event, newDisplayValue) => setDisplayValue(newDisplayValue)}
        onChangeCommitted={onChange}
      />
    </>
  );
}

export default FontWeightInput;
