import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // serverActions: true,
  },
  env: {
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_CALLBACK_URL: process.env.UPLOADTHING_CALLBACK_URL,
  },
};

export default nextConfig;
