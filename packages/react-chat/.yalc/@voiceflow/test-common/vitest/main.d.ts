import type { createMockFactory } from '@voiceflow/test-common';
import type { MockInstance as ViMockInstance } from 'vitest';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { vi } from 'vitest';

export type { DeepMocked } from '@voiceflow/test-common';

export const createMock: ReturnType<typeof createMockFactory<typeof vi>>;

declare module '@voiceflow/test-common' {
  export interface MockInstance<T, Y extends any[]> extends ViMockInstance<Y, T> {}
}
