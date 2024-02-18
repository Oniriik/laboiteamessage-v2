/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    // SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    CRYPTO_SECRET: process.env.CRYPTO_SECRET,
    // ADMIN_IDS: process.env.ADMIN_IDS,
    IP_RESOLVER_KEY: process.env.IP_RESOLVER_KEY,
  }
}
   
  module.exports = nextConfig
