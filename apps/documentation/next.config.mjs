import nextra from 'nextra';

const nextConfig = {
  reactStrictMode: false,
  distDir: 'build',
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.tsx',
});

export default withNextra(nextConfig);
