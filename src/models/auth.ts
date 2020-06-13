export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  confirmed: boolean;
}

export interface AuthErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser;
  errors: AuthErrors;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}
