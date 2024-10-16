export const LogoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 mr-2"
    >
      {/* Stack Base */}
      <rect x="80" y="100" width="40" height="80" fill="currentColor" rx="10" />

      {/* Flame */}
      <path d="M100 20 C110 60, 140 80, 100 120 C60 80, 90 60, 100 20" fill="currentColor" className="text-primary" />

      {/* We've removed the text element for simplicity */}
    </svg>
  );
};
