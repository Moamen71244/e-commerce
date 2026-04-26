import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
      {
        protocol: "https",
        hostname: "route-egypt-apis.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
