/** @type {import('next').NextConfig} */
const nextConfig = {
  // Changes on every build, so the (cached-forever) hero video is re-downloaded after a deploy.
  env: { NEXT_PUBLIC_ASSET_V: Date.now().toString(36) },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
