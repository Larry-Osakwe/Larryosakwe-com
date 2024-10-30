interface WelcomeEmailProps {
  email: string;
  tempPassword?: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  email,
  tempPassword,
  loginUrl,
}) => (
  <div>
    <h1>Welcome to FlareStack!</h1>
    {tempPassword ? (
      <>
        <p>An account has been created for you following your purchase.</p>
        <p>Your temporary login credentials are:</p>
        <ul>
          <li>Email: {email}</li>
          <li>Temporary Password: {tempPassword}</li>
        </ul>
      </>
    ) : (
      <p>Thank you for creating an account!</p>
    )}
    <p>You can login here:</p>
    <a href={loginUrl}>Login to FlareStack</a>
  </div>
); 