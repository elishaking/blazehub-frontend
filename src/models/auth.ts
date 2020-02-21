export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
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
