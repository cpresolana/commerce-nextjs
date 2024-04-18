/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost",
            "cdn.dummyjson.com",
        ],
        /* formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "cdn.dummyjson.com",
                port: "",
                pathname: "/image/upload/**",
            },
        ], */
    },
};

export default nextConfig;
