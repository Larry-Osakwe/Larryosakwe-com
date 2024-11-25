export interface ResendConfig {
  from: {
    name: string;
    email: string;
  };
  support: {
    email: string;  // Your direct email for support
  };
  replyTo?: string; // Optional, for transactional emails
}