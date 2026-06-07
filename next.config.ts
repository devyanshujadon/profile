import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "https://blog.devyanshu.com",
        permanent: false,
      },
      {
        source: "/blog/:slug",
        destination: "https://blog.devyanshu.com/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
