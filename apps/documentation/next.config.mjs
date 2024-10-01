import nextra from 'nextra';

const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.tsx',
});

export default withNextra(nextConfig);
