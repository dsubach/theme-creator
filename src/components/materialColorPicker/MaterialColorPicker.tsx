import React, { useEffect } from 'react';
import * as colors from '@material-ui/core/colors';
import { Tooltip, Collapse } from '@material-ui/core';

import {
  decomposeColor,
  recomposeColor,
  rgbToHex,
  hslToRgb,
} from '@material-ui/core/styles/colorManipulator';
import { useStyles } from './MaterialColorPicker.styles';
import { muiHues, muiShades } from './constants';
import { IMaterialColorPickerProps } from './types';

// record of {"#hexcode": ["hue", "shade"]}
// for all colors in material-ui's spec
const muiColorByHex: Record<string, [string, string]> = {};
for (let i = 0; i < muiHues.length; i++) {
  for (let j = 0; j < muiShades.length; j++) {
    const color = colors[muiHues[i] as keyof typeof colors];
    const hexValue = color[muiShades[j] as keyof typeof color];

    muiColorByHex[hexValue] = [muiHues[i], muiShades[j]];
  }
}

const paletteWidth = 400;
const colorTypeWidth = paletteWidth / muiHues.length;
const colorStrengthWidth = paletteWidth / muiShades.length;

export const MaterialColorPicker = ({ color, onChangeComplete }: IMaterialColorPickerProps) => {
  const [hue, setHue] = React.useState('red');
  const [shade, setShade] = React.useState<string | null>(null);
  const classes = useStyles();

  useEffect(() => {
    // if incoming color maps to a Material UI color, change the input to match
    if (!color) return;
    let hexColor;

    const decomposed = decomposeColor(color);
    switch (decomposed.type) {
      case 'rgba':
        hexColor = rgbToHex(
          recomposeColor({
            type: 'rgb',
            values: decomposed.values.slice(0, 3) as [number, number, number, number],
          }),
        );
        break;
      case 'rgb':
        hexColor = rgbToHex(color);
        break;
      case 'hsla':
        hexColor = rgbToHex(
          hslToRgb(
            recomposeColor({
              type: 'hsl',
              values: decomposed.values.slice(0, 3) as [number, number, number, number],
            }),
          ),
        );
        break;
      case 'hsl':
        hexColor = rgbToHex(hslToRgb(color));
        break;
      default:
        hexColor = color;
    }

    const mappedColor = muiColorByHex[hexColor];

    if (mappedColor) {
      setHue(mappedColor[0]);
      setShade(mappedColor[1]);
    }
  }, [color]);

  return (
    <div>
      <div>
        <div className={classes.paletteContainer}>
          {muiHues.map((c) => {
            const color = colors[c as keyof typeof colors];

            return (
              <Tooltip title={c} placement="top" key={c} TransitionComponent={Collapse} arrow>
                <div
                  style={{
                    height: hue === c ? '1.5em' : '1em',
                    width: colorTypeWidth,
                    backgroundColor: color['500' as keyof typeof color],
                  }}
                  className={classes.colorItem}
                  onClick={() => setHue(c)}
                />
              </Tooltip>
            );
          })}
        </div>
        <div className={classes.paletteContainer}>
          {muiShades.map((s) => {
            const shadeColor =
              colors[(hue as keyof typeof colors) ?? ('red' as keyof typeof colors)];

            return (
              <Tooltip
                title={s}
                key={`${hue ?? 'red'}-${s}`}
                placement="bottom"
                TransitionComponent={Collapse}
                arrow
              >
                <div
                  style={{
                    height: shade === s ? '1.5em' : '1em',
                    width: colorStrengthWidth,
                    backgroundColor: shadeColor[s as keyof typeof shadeColor],
                  }}
                  className={classes.colorItem}
                  onClick={() => {
                    setShade(s);
                    onChangeComplete(shadeColor[s as keyof typeof shadeColor]);
                  }}
                />
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};
