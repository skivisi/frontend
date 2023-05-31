/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: '/api/user',
        destination: `http://localhost:8000/user`,
      },
    ];
  },
};

module.exports = nextConfig;
