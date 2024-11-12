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
      domains: [
        'devyanshu.live',
        'www.devyanshu.live',
        'blog.devyanshu.live',
        'projects.devyanshu.live',
      ],
};

export default nextConfig;
