export default interface User {
  id: string;
  email: string;
  phone: string;
  betterAuthId: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface UserInfo {
  id: string;
  name: string;
  betterAuthId?: string;
}
