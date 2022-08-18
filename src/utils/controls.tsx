import React, { useState } from 'react';
import { SetRequired } from 'type-fest';

export interface ControlProps<T = any> {
  value: T;
  onValueChange: (value: T) => void;
}

export type ControlValue<Props> = Props extends ControlProps<infer R> ? R : never;

export type ControlledProps<Props extends ControlProps<any>> = Omit<Props, keyof ControlProps> & {
  initialValue?: ControlValue<Props>;
};

export interface ControlledOptions<Props extends ControlProps> {
  defaultValue?: ControlValue<Props>;
  enrichProps?: <T extends Omit<Props, keyof ControlProps>>(props: T, state: ReturnType<typeof useState<ControlValue<Props>>>) => T;
}

export const createControlled: {
  <Props extends ControlProps>(Component: React.FC<Props>, options: SetRequired<ControlledOptions<Props>, 'defaultValue'>): React.FC<
    ControlledProps<Props>
  >;
  <Props extends ControlProps>(Component: React.FC<Props>, options?: ControlledOptions<Props>): React.FC<
    SetRequired<ControlledProps<Props>, 'initialValue'>
  >;
} =
  (Component: React.FC<ControlProps<unknown>>, options?: ControlledOptions<ControlProps<unknown>>) =>
  ({ initialValue, ...props }: ControlledProps<ControlProps<unknown>>) => {
    const stateAPI = useState((initialValue ?? options?.defaultValue)!);
    const enrichedProps = options?.enrichProps?.(props, stateAPI) ?? props;
    const [value, setValue] = stateAPI;

    return <Component {...enrichedProps} value={value} onValueChange={setValue} />;
  };
