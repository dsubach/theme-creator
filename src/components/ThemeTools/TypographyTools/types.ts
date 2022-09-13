import { ChangeEvent } from 'react';

export interface IInputProps {
  property?: string;
  value: string;
  onChange: (event: ChangeEvent<unknown>, value: string | number | number[]) => void;
}
