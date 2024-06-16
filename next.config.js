/** @type {import('next').NextConfig} */
const nextConfig = {
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
