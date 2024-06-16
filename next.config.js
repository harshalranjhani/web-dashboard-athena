/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['utfs.io']
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: 'http://localhost:8080/',
      },
    ]
  },
};

module.exports = nextConfig;
