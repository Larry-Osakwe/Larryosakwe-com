export interface AuthResponse {
  success?: boolean;
  error?: boolean;
  message: string;
  user?: {
    id: string;
    email: string | null;
  };
}

export interface AuthUser {
  id: string;
  email: string | null;
  hasAccess: boolean;
  isAdmin: boolean;
  profile: {
    name: string | null;
    image: string | null;
  };
}

export interface AuthFormState {
  isLoading: boolean;
  serverError: string | null;
}