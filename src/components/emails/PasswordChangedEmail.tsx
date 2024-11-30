interface PasswordChangedEmailProps {
  email: string;
}

export const PasswordChangedEmail: React.FC<Readonly<PasswordChangedEmailProps>> = ({
  email,
}) => (
  <div>
    <h1>Password Changed Successfully</h1>
    <p>The password for your FlareStack account ({email}) has been changed successfully.</p>
    <p>If you did not make this change, please contact support immediately or reset your password:</p>
    <a
      href={`${process.env.NEXT_PUBLIC_URL}/forgot-password`}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '5px',
        display: 'inline-block',
        marginTop: '10px'
      }}
    >
      Reset Password
    </a>
    <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
      If you did make this change, you can safely ignore this email.
    </p>
  </div>
); 