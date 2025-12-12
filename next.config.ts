import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hel1.your-objectstorage.com",
        pathname: "/**",
      },
    ],
    unoptimized: true, // <-- bypass Next image optimization
  },
};

export default nextConfig;
