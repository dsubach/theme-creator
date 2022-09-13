import { TypographyTypeMap } from '@material-ui/core';

export interface ITypographySampleAreaProps {
  variant: TypographyTypeMap['props']['variant'];
  bgText: string;
  paperText: string;
  smallPreview?: boolean;
  [x: string]: any;
}
