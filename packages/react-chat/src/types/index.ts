import { $$StyledComponentProps } from '@voiceflow/stitches-react/types/styled-component';

export * from './trace';
export * from './turn';
export * from './util';

export type Nullish<T> = T | null | undefined;

export type VariantProp<
  Component extends { [key: symbol | string]: any },
  Key extends keyof Component[$$StyledComponentProps]
> = Component[$$StyledComponentProps][Key];
