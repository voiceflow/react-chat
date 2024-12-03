import type { $$StyledComponentProps } from '@voiceflow/stitches-react/types/styled-component';
export * from './session';
export * from './settings';
export * from './trace';
export * from './turn';
export * from './util';
export * from './variants';
export { ChatPersistence, ChatPosition } from '@voiceflow/voiceflow-types/build/cjs/version/chat';

export type Nullish<T> = T | null | undefined;

export type VariantProp<
  Component extends { [key: symbol | string]: any },
  Key extends keyof Component[$$StyledComponentProps],
> = Component[$$StyledComponentProps][Key];
