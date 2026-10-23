import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.CLOUDFLARE_STATIC_EXPORT === "true" ? "export" : "standalone",
};

export default nextConfig;
