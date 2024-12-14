/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  // Mematikan optimasi gambar
    domains: ['www.api.rizsign.com'],  // Memungkinkan gambar dari domain ini
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.api.rizsign.com',  // Pola URL untuk gambar
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://www.rizsign.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' }
        ],
      },
    ]
  }
}

module.exports = nextConfig;
