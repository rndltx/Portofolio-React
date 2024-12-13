const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['www.rizsign.com', 'rizsign.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.rizsign.com'
      },
      {
        protocol: 'https',
        hostname: 'rizsign.com'
      }
    ]
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://www.rizsign.com/api'
  }
}

module.exports = nextConfig

