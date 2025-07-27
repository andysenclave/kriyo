// Simple auth types for the frontend
export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}
