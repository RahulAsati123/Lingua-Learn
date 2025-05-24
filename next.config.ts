import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    turbo: {
      resolveAlias: {
        '@': '.',
        '@/components': './components',
        '@/lib': './lib',
        '@/actions': './actions',
        '@/db': './db',
        '@/app': './app',
      },
    },
  },
}

export default nextConfig
