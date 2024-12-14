/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['www.api.rizsign.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.api.rizsign.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://www.api.rizsign.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' }
        ],
      },
    ]
  }
}

module.exports = nextConfig;
