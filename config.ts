import { AppConfig } from "@/types/config";

/**
 * Stripe Price IDs Configuration
 * These IDs link to specific products/prices in your Stripe Dashboard
 * Different IDs for development and production environments
 * Find these under Products > Select Product > Prices in your Stripe Dashboard
 */
const PRICE_IDS = {
  development: {
    starter: "your_dev_starter_price_id",    // e.g., price_1ABC123...
    allIn: "your_dev_premium_price_id"       // e.g., price_1XYZ456...
  },
  production: {
    starter: "your_prod_starter_price_id",   // e.g., price_1DEF789...
    allIn: "your_prod_premium_price_id"      // e.g., price_1GHI012...
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
  appName: "Your App Name",                  // Used throughout the app for SEO and branding
  appDescription: "A compelling description of your application in 1-2 sentences", // Used for SEO meta tags
  domainName: "yourdomain.com",              // Your domain without protocol (e.g., myapp.com)

  stripe: {
    plans: [
      {
        // Starter Plan Configuration
        priceId: process.env.NODE_ENV === "development" 
          ? PRICE_IDS.development.starter 
          : PRICE_IDS.production.starter,
        name: "Starter",
        description: "Your plan description",
        price: 99,                           // Price in USD
        priceAnchor: 199,                    // Optional: Original price for showing discounts
        mode: 'payment',                     // 'payment' for one-time, 'subscription' for recurring
        isFeatured: false,                   // Set to true to highlight this plan in the UI
        couponId: process.env.NODE_ENV === "development"
          ? COUPON_IDS.development.default
          : COUPON_IDS.production.default,
        features: [
          { name: "Feature 1" },
          { name: "Feature 2" },
          { name: "Feature 3" },
        ],
      },
      {
        // Premium Plan Configuration
        priceId: process.env.NODE_ENV === "development" 
          ? PRICE_IDS.development.allIn 
          : PRICE_IDS.production.allIn,
        name: "Premium",
        description: "Your premium plan description",
        price: 149,
        priceAnchor: 249,
        mode: 'payment',
        isFeatured: true,                    // This plan will be highlighted in the pricing UI
        couponId: process.env.NODE_ENV === "development"
          ? COUPON_IDS.development.default
          : COUPON_IDS.production.default,
        features: [
          { name: "Everything in Starter" },
          { name: "Premium Feature 1" },
          { name: "Premium Feature 2" },
          { name: "Premium Feature 3" },
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
      url: '',                               // Your Google Calendar URL
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
      name: "Awesome App",                    // Display name for outgoing emails
      email: "info@awesomeapp.com"            // Email address for sending
    },
    support: {
      email: "gethelp@awesomeapp.com",          // Address for receiving support inquiries
    },
    replyTo: "gethelp@awesomeapp.com"           // Default reply-to address
  }
};