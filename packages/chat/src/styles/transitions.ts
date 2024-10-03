import { duration, timingFunction } from './animations';

export interface TransitionOptions {
  duration: string;
  timingFunction: string;
}

export const createTransition =
  ({ duration: defaultDuration, timingFunction: defaultTimingFunction }: TransitionOptions) =>
  (
    properties: ReadonlyArray<string>,
    { duration = defaultDuration, timingFunction = defaultTimingFunction }: Partial<TransitionOptions> = {}
  ) =>
    properties.map((prop) => `${prop} ${duration} ${timingFunction}`).join(', ');

export const transition = createTransition({
  duration: duration.default,
  timingFunction: timingFunction.default,
});
