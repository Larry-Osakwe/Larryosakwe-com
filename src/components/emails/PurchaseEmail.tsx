interface PurchaseEmailProps {
  customerEmail: string;
  productName: string;
  dashboardUrl: string;
}

export const PurchaseEmail: React.FC<Readonly<PurchaseEmailProps>> = ({
  customerEmail,
  productName,
  dashboardUrl,
}) => (
  <div>
    <h1>Thank you for your purchase!</h1>
    <p>We're excited to have you as a customer.</p>
    <p>Order Details:</p>
    <ul>
      <li>Product: {productName}</li>
      <li>Email: {customerEmail}</li>
    </ul>
    <p>You can access your dashboard here:</p>
    <a href={dashboardUrl}>Go to Dashboard</a>
  </div>
); 