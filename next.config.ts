import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Repo ini sudah punya AGENTS.md sendiri; jangan biarkan `next dev` menimpanya.
  agentRules: false,
};

export default nextConfig;
