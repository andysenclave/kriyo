export interface MyProfile {
  email: string;
  phone: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export default interface GetMyProfileResponse extends MyProfile {
  id: string;
}
