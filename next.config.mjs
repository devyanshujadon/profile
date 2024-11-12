/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",            // Match any path on the subdomain
        destination: "/projects/:path*",   // Rewrite to /blog route
        has: [
          {
            type: "host",
            value: "projects.devyanshu.live", // The subdomain to match
          },
        ],
      },
    ];
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com'
            
           
          },
        ],
      },
      domains: [
        'devyanshu.live',
        'www.devyanshu.live',
        'blog.devyanshu.live',
        'projects.devyanshu.live',
      ],
};

export default nextConfig;
