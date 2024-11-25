import { ResendConfig } from "./resend";
import { SchedulerConfig } from "./scheduler";
import { StripeConfig } from "./stripe";

export interface AppConfig {
    appName: string;
    appDescription: string;
    domainName: string;
    stripe: StripeConfig;
    scheduler: SchedulerConfig;
    resend: ResendConfig;
  }