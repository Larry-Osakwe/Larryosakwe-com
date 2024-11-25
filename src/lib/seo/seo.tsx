import type { Metadata } from 'next'
import { config } from "@/config";

/**
 * Generates SEO metadata for Next.js pages
 * 
 * This utility creates a comprehensive set of meta tags for:
 * - Basic SEO (title, description, keywords)
 * - Open Graph (social sharing)
 * - Twitter Cards
 * - Robots directives
 * - Canonical URLs
 * 
 * @param options Configuration options for SEO tags
 * @returns Next.js Metadata object
 * 
 * @example
 * ```tsx
 * // In your page.tsx
 * export const metadata = getSEOTags({
 *   title: 'My Page',
 *   description: 'Custom page description',
 *   canonicalUrlRelative: '/my-page'
 * });
 * ```
 */
export const getSEOTags = ({
    description,
    keywords,
    openGraph,
    canonicalUrlRelative,
    robots,
    extraTags,
}: Metadata & {
    canonicalUrlRelative?: string;  // Relative path for canonical URL (e.g., '/about')
    extraTags?: Record<string, any>;// Additional custom metadata tags
} = {}) => {
    const metadata: Metadata = {
        // Title configuration with template
        title: {
            template: `%s | ${config.appName}`, // Format: "Page Title | App Name"
            default: config.appName,            // Used when no title is provided
        },

        // Basic metadata
        description: description || config.appDescription,
        applicationName: config.appName,
        keywords: keywords || ['NextJS', 'Boilerplate', 'Stripe', 'Supabase', 'React'],
        authors: [{ name: config.appName, url: `https://${config.domainName}` }],
        creator: config.appName,
        publisher: config.appName,

        // Base URL for all relative URLs in metadata
        metadataBase: new URL(
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000/"
                : `https://${config.domainName}/`
        ),

        // Open Graph metadata for social sharing
        openGraph: {
            title: openGraph?.title || config.appName,
            description: openGraph?.description || config.appDescription,
            url: openGraph?.url || `https://${config.domainName}/`,
            siteName: openGraph?.siteName || config.appName,
            /**
             * Open Graph Image (optional)
             * To add an OG image:
             * 1. Add opengraph-image.(jpg|jpeg|png|gif) to /app folder
             * 2. Or uncomment and customize the following:
             */
            // images: [
            //     {
            //         url: `https://${config.domainName}/opengraph-image.png`,
            //         width: 800,  
            //         height: 600,
            //     },
            // ],
            locale: "en_US",
            type: "website",
        },

        // Search engine directives
        // See https://flarestack.io/docs/seo for more details
        robots: robots || {
            index: true,                    // Allow search engines to index the page
            follow: true,                   // Allow search engines to follow links
            "max-image-preview": "large",   // Allow large image previews in search results
            "max-snippet": -1,             // Allow any length for text snippets
            "max-video-preview": -1,       // Allow any length for video previews
            googleBot: {                   // Specific instructions for Google's crawler
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            }
        },

        // Twitter Card metadata
        twitter: {
            card: "summary_large_image",    // Large image card format
            title: openGraph?.title || config.appName,
            description: openGraph?.description || config.appDescription,
            site: "@lairelaflare",          // Your Twitter handle
            creator: "@lairelaflare",       // Content creator's Twitter handle
            /**
             * Twitter Image (optional)
             * To add a Twitter image:
             * 1. Add twitter-image.(jpg|jpeg|png|gif) to /app folder
             * 2. Or uncomment and customize the following:
             */
            // images: [
            //     {
            //         url: `https://${config.domainName}/twitter-image.png`,
            //         width: 800,  
            //         height: 600,
            //     },
            // ],
        },

        // Canonical URL configuration
        // Helps prevent duplicate content issues
        ...(canonicalUrlRelative && {
            alternates: { canonical: canonicalUrlRelative },
        }),

        // Merge any additional custom tags
        ...extraTags,
    };

    return metadata;
};