/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // For any https images
      },
      {
        protocol: "http",
        hostname: "localhost", // For local images served from http://localhost
        port: "5000", // Add the port number if your server runs on a specific port
      },
    ],
  },
};

export default nextConfig;
