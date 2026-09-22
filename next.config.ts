import type { NextConfig } from 'next';
const nextConfig: NextConfig = { images: { formats: ['image/avif','image/webp'], deviceSizes: [480, 768, 1200, 1600], imageSizes: [320, 480, 640], remotePatterns: [{ protocol: 'https', hostname: 'gateway.irys.xyz' }] } };
export default nextConfig;
