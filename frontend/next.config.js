
/** @type {import('next').NextConfig} */

const path = require("path");
require("dotenv").config();
const nextConfig = {
  experimental: { images: { allowFutureImage: true } },
  env:{
    API_URL: process.env.API_URL,
    GET_DATA_API: process.env.GET_DATA_API,
    SUPER_USER: process.env.SUPER_USER
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
