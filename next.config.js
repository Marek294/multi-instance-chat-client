/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  publicRuntimeConfig: {
    appServerUrl: process.env.APP_SERVER_URL
  }
}

module.exports = nextConfig
