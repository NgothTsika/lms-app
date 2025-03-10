import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  experimental: {
    // serverActions: true, // Important for UploadThing
  },
  env: {
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_CALLBACK_URL: process.env.UPLOADTHING_CALLBACK_URL,
  },
  /* config options here */
};

export default nextConfig;
