import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2itgugo8xs.ufs.sh",
        // hostname: "utfs.io",
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
