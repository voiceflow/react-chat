import { vi } from 'vitest';

export const createStitches = vi.fn().mockReturnValue({
  styled: vi.fn().mockImplementation((el) => el),
});

export const keyframes = vi.fn();
