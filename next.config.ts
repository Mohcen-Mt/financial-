import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer, dev }) => {
    // This prevents Genkit/AI related code from being bundled in production.
    if (!dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/ai/genkit': false,
        '@/ai/flows/ai-pricing-suggestions': false,
        '@/ai/dev': false,
      };
    }
    return config;
  },
};

export default nextConfig;
