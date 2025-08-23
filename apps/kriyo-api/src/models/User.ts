export default interface User {
  id: string;
  email: string;
  phone: string;
  betterAuthId: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
}
