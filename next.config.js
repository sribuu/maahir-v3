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
      {
        source: "/cdn/images/:path*",
        destination:
          "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/supplier/login",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
