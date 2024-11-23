import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['tailwindui.com'], // 添加允许的域名
  },
};

export default nextConfig;
