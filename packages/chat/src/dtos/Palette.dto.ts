import { z } from 'zod';

import { createPalette } from '@/styles/colors';

export const Palette = z
  .object({
    50: z.string(),
    100: z.string(),
    200: z.string(),
    300: z.string(),
    400: z.string(),
    500: z.string(),
    600: z.string(),
    700: z.string(),
    800: z.string(),
    900: z.string(),
  })
  .default(createPalette());

export type Palette = z.infer<typeof Palette>;
