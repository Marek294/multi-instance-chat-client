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
    serverHost: process.env.SERVER_HOST,
    serverSecure: process.env.SERVER_SECURE === 'true'
  }
}

module.exports = nextConfig
