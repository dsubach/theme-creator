import React, { useState, useEffect } from 'react';
import { ChromePicker, ColorChangeHandler, ColorResult } from 'react-color';
import { MaterialColorPicker } from '../materialColorPicker/MaterialColorPicker';
import { IColorPickerProps } from './types';

export const ColorPicker = ({ color, onChangeComplete }: IColorPickerProps) => {
  const [inputValue, setInputValue] = useState('#fff');

  useEffect(() => {
    setInputValue(color);
  }, [color]);

  const handleChange = (colorObject: ColorResult): string => {
    if (colorObject.rgb.a === 1) {
      setInputValue(colorObject.hex);
      return colorObject.hex;
    } else {
      const rgb = `rgb(${colorObject.rgb.r},${colorObject.rgb.g},${colorObject.rgb.b})`;
      setInputValue(rgb);
      return rgb;
    }
  };

  const handleChangeComplete: ColorChangeHandler = (colorObject: ColorResult) => {
    const colorString = handleChange(colorObject);
    onChangeComplete(colorString);
  };

  return (
    <>
      <MaterialColorPicker color={inputValue} onChangeComplete={onChangeComplete} />
      <ChromePicker
        color={inputValue}
        onChange={handleChange}
        onChangeComplete={handleChangeComplete}
      />
    </>
  );
};
