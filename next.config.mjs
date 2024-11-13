/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com'
            
           
          },
        ],
      },
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*",            // Match any path on the subdomain
        destination: "/projects/:path*",  // Rewrite to /projects route
        has: [
          {
            type: "host",
            value: "projects.devyanshu.live", // Specify the subdomain to match
          },
        ],
      },
    ];
  },
};

export default nextConfig;
