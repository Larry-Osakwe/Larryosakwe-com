import { AppConfig } from "@/types/config";

// Replace these with your Stripe price IDs from your Stripe Dashboard
// You can find these under Products > Select Product > Price IDs
const PRICE_IDS = {
  development: {
    starter: "your_dev_starter_price_id",    // Example: price_1ABC123...
    allIn: "your_dev_premium_price_id"       // Example: price_1XYZ456...
  },
  production: {
    starter: "your_prod_starter_price_id",   // Example: price_1DEF789...
    allIn: "your_prod_premium_price_id"      // Example: price_1GHI012...
  }
};

// Replace these with your Stripe coupon IDs (optional)
// You can create these in your Stripe Dashboard under Coupons
const COUPON_IDS = {
  development: {
    default: "your_dev_coupon_id"    // Example: ABC123
  },
  production: {
    default: "your_prod_coupon_id"   // Example: XYZ789
  }
};

export const config: AppConfig = {
  // REQUIRED: Your application name (used for SEO, titles, etc)
  appName: "Your App Name",

  // REQUIRED: A brief description of your application (used for SEO)
  appDescription: "A compelling description of your application in 1-2 sentences",

  // REQUIRED: Your domain name without protocol or www
  // Example: myapp.com
  domainName: "yourdomain.com",

  stripe: {
    // List of plans available to your customers. Add as many as you want.
    plans: [
      {
        // Basic/Starter Plan Configuration
        priceId: process.env.NODE_ENV === "development" 
          ? PRICE_IDS.development.starter 
          : PRICE_IDS.production.starter,
        name: "Starter",                     // Display name for your plan
        description: "Your plan description", // Brief description of the plan
        price: 99,                           // Current price in USD
        priceAnchor: 199,                    // Original/crossed-out price (optional)
        mode: 'payment',                     // 'payment' for one-time, 'subscription' for recurring
        isFeatured: false,                   // Whether to highlight this plan
        couponId: process.env.NODE_ENV === "development"
          ? COUPON_IDS.development.default
          : COUPON_IDS.production.default,
        // List the features included in this plan
        features: [
          { name: "Feature 1" },
          { name: "Feature 2" },
          { name: "Feature 3" },
          // Add more features as needed
        ],
      },
      {
        // Premium/All-In Plan Configuration
        priceId: process.env.NODE_ENV === "development" 
          ? PRICE_IDS.development.allIn 
          : PRICE_IDS.production.allIn,
        name: "Premium",
        description: "Your premium plan description",
        price: 149,
        priceAnchor: 249,
        mode: 'payment',
        isFeatured: true,                    // Highlight this as your featured plan
        couponId: process.env.NODE_ENV === "development"
          ? COUPON_IDS.development.default
          : COUPON_IDS.production.default,
        features: [
          { name: "Everything in Starter" },
          { name: "Premium Feature 1" },
          { name: "Premium Feature 2" },
          { name: "Premium Feature 3" },
          // Add more premium features
        ],
      }
    ],
  },

  // Google Calendar Scheduler. See https://flarestack.io/docs/scheduler for more information
  scheduler: {
    enabled: true,
    defaultConfig: {
      url: '', // Replace with your Google Calendar URL
      color: '#f97316', // Replace with your brand color
      label: 'Book an appointment',
      inline: false, // false for button, true for iframe
      width: '100%',
      height: '600px'
    }
  },

  // Resend email configuration. See https://flarestack.io/docs/email for more information
  resend: {
    from: {
      name: "FlareStack", // Replace with your brand name
      email: "info@flarestack.io" // Replace with your email
    },
    support: {
      email: "larry@laflarela.com", // Replace with your support email
    },
    replyTo: "larry@laflarela.com" // Replace with your reply-to email
  }
};