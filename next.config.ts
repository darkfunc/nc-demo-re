import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Adjust connect-src / img-src to match every external host you actually use
// (Sanity CDN, Google Fonts, your API, analytics, etc).
// Note: 'unsafe-eval' is only required for the Next dev server (React refresh);
// it must never ship to production. 'unsafe-inline' stays because the JSON-LD
// blocks are inline <script> tags and the site is statically rendered — a
// nonce-based CSP would disable ISR/static generation for every route.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"};
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https://cdn.sanity.io;
  connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  ${isProd ? "upgrade-insecure-requests;" : ""}
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // Applies to every route
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;