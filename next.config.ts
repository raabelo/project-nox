import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("https://br.pinterest.com/**"),
            new URL("https://i.pinimg.com/**"),
        ],
    },
};

export default nextConfig;
