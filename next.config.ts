import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose"],
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
