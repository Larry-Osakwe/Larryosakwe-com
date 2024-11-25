export interface EmailResponse {
  data?: any;
  error?: any;
}

export interface EmailTemplateProps {
  email: string;
  customerEmail?: string;
  productName?: string;
  dashboardUrl?: string;
}