import { defineConfig } from 'vite';

import { createPlugins } from '../vite.config';

export default defineConfig({
  plugins: createPlugins(__dirname),
});
