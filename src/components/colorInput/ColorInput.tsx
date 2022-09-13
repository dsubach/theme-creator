import React from 'react';
import { TextField, InputAdornment, Popover } from '@material-ui/core';
import { colorFromString } from './utils';
import { ThemeValueChangeEvent } from 'src/components/ThemeTools/events';
import { IColorInputProps } from './types';
import { useStyles } from './ColorInput.styles';
import { ColorPicker } from '../colorPicker/ColorPicker';

export const ColorInput = ({ label, color, onColorChange }: IColorInputProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleOpenPopover = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    document.dispatchEvent(ThemeValueChangeEvent());
  };

  const handleColorChange = (value: string) => onColorChange(value);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const pastedText = event.clipboardData.getData('text');
    const color = colorFromString(pastedText);
    if (color != null) {
      handleColorChange(color);
    }
  };

  const popoverOpen = Boolean(anchorEl);
  return (
    <div>
      <TextField
        label={label}
        onClick={handleOpenPopover}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div
                className={classes.colorSampleAdornment}
                style={{
                  backgroundColor: color,
                }}
              />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
        size="small"
        value={color}
        onPaste={handlePaste}
      />
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          className: classes.popoverPaper,
        }}
        disableAutoFocus
        disableEnforceFocus
      >
        <ColorPicker color={color} onChangeComplete={handleColorChange} />
      </Popover>
    </div>
  );
};
