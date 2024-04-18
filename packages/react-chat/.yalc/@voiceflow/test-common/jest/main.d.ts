import type { createMockFactory } from '@voiceflow/test-common';

export type { DeepMocked } from '@voiceflow/test-common';

export const createMock: ReturnType<typeof createMockFactory<typeof jest>>;

declare module '@voiceflow/test-common' {
  export interface MockInstance<T, Y extends any[]> extends jest.MockInstance<T, Y> {}
}
