import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import baseConfig from '@voiceflow/vitest-config';
import type { UserConfig } from 'vitest/config';
import { mergeConfig } from 'vitest/config';

export default mergeConfig<UserConfig, UserConfig>(baseConfig, {
  define: {
    __USE_SHADOW_ROOT__: true,
  },
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./config/test/setup.ts'],
  },
});
