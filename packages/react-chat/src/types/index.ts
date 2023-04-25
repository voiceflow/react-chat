import { $$StyledComponentProps } from '@stitches/react/types/styled-component';

export * from './turn';
export * from './util';

export type Nullish<T> = T | null | undefined;

export type VariantProp<
  Component extends { [key: symbol | string]: any },
  Key extends keyof Component[$$StyledComponentProps]
> = Component[$$StyledComponentProps][Key];
