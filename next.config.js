/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force all pages to be dynamic
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Exclude template directory from build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/salephone template/**'],
    }
    return config
  },
}

module.exports = nextConfig
