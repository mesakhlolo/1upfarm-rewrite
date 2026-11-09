import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Repo ini sudah punya AGENTS.md sendiri; jangan biarkan `next dev` menimpanya.
  agentRules: false,
  experimental: {
    // Halaman lokal (Zustand) tidak perlu refetch tiap navigasi — pakai router
    // cache agar pindah halaman terasa instan di dalam sesi yang sama.
    // Default Next 16: dynamic 0 (tidak dicache), static 300.
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;
