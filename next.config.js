/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: { appDir: true },
    env: {
        NEXTAUTH_SECRET: "morlamticket",
        API_ENDPOINT: "http://localhost:8088/v1/",
        FACEBOOK_CLIENT_ID: "1515139025919345",
        FACEBOOK_CLIENT_SECRET: "a2bb3f2300b1a612e862d63cc72eb7ff",
        LINE_TOKEN:"gnS0rBXomqz9NUEvqyqSe9kcJsnY0jtnN8Ej7awmVnh",
    }
}

module.exports = nextConfig
