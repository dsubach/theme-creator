import { ChangeEvent } from 'react';

export interface ILineHeightInput {
  onChange: (event: ChangeEvent<unknown>, value: string) => void;
  value: string;
}
