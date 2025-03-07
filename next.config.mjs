/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default config;
