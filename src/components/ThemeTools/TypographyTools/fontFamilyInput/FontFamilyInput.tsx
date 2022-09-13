import React, { useState, useEffect } from 'react';
import { FontSelector } from '../fontSelector/FontSelector';
import { TextField, InputAdornment, Typography } from '@material-ui/core';
import { IInputProps } from '../types';

function FontFamilyInput({ value, onChange }: IInputProps) {
  const [input, setInput] = useState(value);

  useEffect(() => setInput(value), [value]);
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange(event, input);
  };

  const handleFontSelected = (fontName: string) => {
    onChange(null, fontName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="caption" color="textSecondary">
        Font Family
      </Typography>
      <TextField
        name="fontfamily"
        value={input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FontSelector onSelectFont={handleFontSelected} />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default FontFamilyInput;
