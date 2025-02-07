/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
};
module.exports = nextConfig;
