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
        source: '/api/:path*',  // Menentukan pola path untuk API
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://www.rizsign.com' },  // Menentukan asal yang diizinkan
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },  // Metode yang diizinkan
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization' },  // Header yang diizinkan
          { key: 'Access-Control-Allow-Credentials', value: 'true' },  // Mengizinkan kredensial
        ],
      },
    ];
  },
};

module.exports = nextConfig;
