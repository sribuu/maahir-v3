/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/remote/:path*",
        destination:
          "https://qq1fyme2kc.execute-api.ap-southeast-3.amazonaws.com/staging/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
