import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
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
