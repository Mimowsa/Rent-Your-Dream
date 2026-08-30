import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the project root so Turbopack doesn't walk up to the home directory
  // (a stray lockfile lives there).
  turbopack: { root: __dirname },
  images: {
    // Real photos are large source files; serve modern formats + tighter sizes.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920, 2048],
  },
}

export default nextConfig
