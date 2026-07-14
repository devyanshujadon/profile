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
      // Public writing index lives on the journal host.
      // Keep /blog/admin and /blog/* API-adjacent pages on the main site.
      {
        source: "/blog",
        destination: "https://blog.devyanshu.com",
        permanent: false,
      },
    ];
  },

};

export default nextConfig;
