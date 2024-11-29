import { AppConfig } from "@/types/config";

/**
 * Stripe Price IDs Configuration
 * These IDs link to specific products/prices in your Stripe Dashboard
 * Different IDs for development and production environments
 * Find these under Products > Select Product > Prices in your Stripe Dashboard
 */
const PRICE_IDS = {
  development: {
    standard: "your_dev_standard_price_id",
    pro: "your_dev_pro_price_id"
  },
  production: {
    standard: "your_prod_standard_price_id",
    pro: "your_prod_pro_price_id"
  }
};

/**
 * Stripe Coupon Configuration
 * Optional: Configure discount coupons for your pricing plans
 * Create and manage these in your Stripe Dashboard under Coupons
 */
const COUPON_IDS = {
  development: {
    default: "your_dev_coupon_id"    // e.g., EARLYBIRD_DEV
  },
  production: {
    default: "your_prod_coupon_id"   // e.g., EARLYBIRD_PROD
  }
};

export const config: AppConfig = {
  // Core Application Settings
  appName: "Larry Osakwe",                  // Used throughout the app for SEO and branding
  appDescription: "A one man development studio", // Used for SEO meta tags
  domainName: "larryosakwe.com",              // Your domain without protocol (e.g., myapp.com)

  stripe: {
    plans: [
      {
        // Starter Plan Configuration
        priceId: process.env.NODE_ENV === "development" 
          ? PRICE_IDS.development.standard 
          : PRICE_IDS.production.standard,
        name: "Standard",
        description: "One request at a time. Pause or cancel anytime.",
        price: 4995,
        mode: 'subscription',
        isFeatured: false,
        features: [
          { name: "One request at a time" },
          { name: "Average 72 hour delivery" },
          { name: "Full-stack development" },
          { name: "Modern tech stack" },
          { name: "User authentication" },
          { name: "Database setup" },
          { name: "API integration" },
          { name: "Responsive design" },
          { name: "Unlimited revisions" },
          { name: "Pause or cancel anytime" }
        ],
      },
      {
        // Premium Plan Configuration
        priceId: process.env.NODE_ENV === "development" 
          ? PRICE_IDS.development.pro 
          : PRICE_IDS.production.pro,
        name: "Pro",
        description: "Double the requests. Pause or cancel anytime.",
        price: 7995,
        mode: 'subscription',
        isFeatured: true, // This plan will be highlighted in the pricing UI
        features: [
          { name: "Two requests at a time" },
          { name: "Average 72 hour delivery" },
          { name: "Full-stack development" },
          { name: "Modern tech stack" },
          { name: "User authentication" },
          { name: "Database setup" },
          { name: "API integration" },
          { name: "Responsive design" },
          { name: "Unlimited revisions" },
          { name: "Pause or cancel anytime" }
        ],
      }
    ],
  },

  /**
   * Google Calendar Scheduler Configuration
   * Enable this to add booking functionality to your application
   * See documentation: https://flarestack.io/docs/scheduler
   */
  scheduler: {
    enabled: true,
    defaultConfig: {
      url: 'https://calendar.app.google/zCUMDobyyD5gjJWw7',                               // Your Google Calendar URL
      color: '#f97316',                      // Brand color for the scheduler
      label: 'Book an appointment',
      inline: false,                         // false: show as button, true: show as iframe
      width: '100%',
      height: '600px'
    }
  },

  /**
   * Email Configuration using Resend
   * Configure your application's email sending capabilities
   * See documentation: https://flarestack.io/docs/email
   */
  resend: {
    from: {
      name: "Larry Osakwe",                    // Display name for outgoing emails
      email: "larry@larryosakwe.com"            // Email address for sending
    },
    support: {
      email: "larry@laflarela.com",          // Address for receiving support inquiries
    },
    replyTo: "larry@laflarela.com"           // Default reply-to address
  }
};