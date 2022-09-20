import { ChangeEvent } from 'react';

export interface IInputProps {
  property?: string;
  value: string;
  onChange: (event: ChangeEvent<unknown> | null, value: string | number | number[]) => void;
}
