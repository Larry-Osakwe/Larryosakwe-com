import type { Metadata } from 'next'
import { config } from "@/config";

export const getSEOTags = ({
    description,
    keywords,
    openGraph,
    canonicalUrlRelative,
    robots,
    extraTags,
}: Metadata & {
    canonicalUrlRelative?: string;
    extraTags?: Record<string, any>;
} = {}) => {
    const metadata: Metadata = {
        title: {
            template: `%s | ${config.appName}`,
            default: config.appName,
        },
        description: description || config.appDescription,
        applicationName: config.appName,
        keywords: keywords || ['NextJS', 'Boilerplate', 'Stripe', 'Supabase', 'React'],
        authors: [{ name: config.appName, url: `https://${config.domainName}` }],
        creator: config.appName,
        publisher: config.appName,
        metadataBase: new URL(
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000/"
                : `https://${config.domainName}/`
        ),
        openGraph: {
            title: openGraph?.title || config.appName,
            description: openGraph?.description || config.appDescription,
            url: openGraph?.url || `https://${config.domainName}/`,
            siteName: openGraph?.siteName || config.appName,
            // If you add an opengraph-image to the /app folder, you don't need to set this
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
        // Allows search engines to index the page. Can be overridden. See https://flarestack.io/docs/seo for more details.
        robots: robots || {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            }
        },
        twitter: {
            card: "summary_large_image",
            title: openGraph?.title || config.appName,
            description: openGraph?.description || config.appDescription,
            site: "@lairelaflare",
            creator: "@lairelaflare",
            // If you add an twitter-image to the /app folder, you don't need to set this
            // images: [
            //     {
            //         url: `https://${config.domainName}/twitter-image.png`,
            //         width: 800,  
            //         height: 600,
            //     },
            // ],
        },
        // If a canonical URL is given, we add it. The metadataBase will turn the relative URL into a fully qualified URL
        ...(canonicalUrlRelative && {
            alternates: { canonical: canonicalUrlRelative },
        }),

        // If you want to add extra tags, you can pass them here
        ...extraTags,
    };

    return metadata;
};