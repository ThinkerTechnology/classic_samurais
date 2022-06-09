module.exports = {
  reactStrictMode: true,
  // basePath: '/',
  basePath: '/classic_samurais',
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/home': { page: '/' },
    }
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  trailingSlash: true,
}
