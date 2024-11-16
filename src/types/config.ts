import { StripeConfig } from "./stripe";

export interface AppConfig {
    appName: string;
    appDescription: string;
    domainName: string;
    stripe: StripeConfig;
  } 