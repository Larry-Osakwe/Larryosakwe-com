export const config = {
  // REQUIRED   : Replace with your app name
  appName: "FlareStack",
  // REQUIRED: A short description of your app for SEO tags 
  appDescription: "Your app description here",
  // REQUIRED: Your domain name (No http:// or https://, no trailing slash, no www, just the naked domain)
  domainName: "flarestack.io",
  stripe: {
    priceId: "price_1QEiQ5B17jeLyvdz3lfySqRh",
  },

  // Authentication paths
  auth: {
    loginUrl: "/signin",
    callbackUrl: "/dashboard",
  },

  // Add other app-wide configurations here
};
