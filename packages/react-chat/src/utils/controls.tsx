import React, { useState } from 'react';
import { SetRequired } from 'type-fest';

export interface ControlProps<T = any> {
  /**
   * The value being controlled by the component.
   */
  value: T;

  /**
   * A callback that will be called with new values when the control is updated.
   */
  onValueChange: (value: T) => void;
}

export type ControlValue<Props> = Props extends ControlProps<infer R> ? R : never;

export type ControlledProps<Props extends ControlProps<any>> = Omit<Props, keyof ControlProps> & {
  initialValue?: ControlValue<Props>;
};

export interface ControlledOptions<Props extends ControlProps> {
  defaultValue?: ControlValue<Props>;
  enrichProps?: <T extends Omit<Props, keyof ControlProps>>(props: T, state: [ControlValue<Props>, (value: ControlValue<Props>) => void]) => T;
}

export const createControlled: {
  <Props extends ControlProps>(Component: React.FC<Props>, options: SetRequired<ControlledOptions<Props>, 'defaultValue'>): React.FC<
    ControlledProps<Props>
  >;
  <Props extends ControlProps>(Component: React.FC<Props>, options?: ControlledOptions<Props>): React.FC<
    SetRequired<ControlledProps<Props>, 'initialValue'>
  >;
} =
  (Component: React.FC<ControlProps<any>>, options?: ControlledOptions<ControlProps<any>>) =>
  ({ initialValue, ...props }: ControlledProps<ControlProps<any>>) => {
    const stateAPI = useState<ControlProps<any>>((initialValue ?? options?.defaultValue)!);
    const enrichedProps = options?.enrichProps?.(props, stateAPI) ?? props;
    const [value, setValue] = stateAPI;

    return <Component {...enrichedProps} value={value} onValueChange={setValue} />;
  };
