/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apii.online",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
