export type UserType = 'CUSTOMER' | 'VENDOR';

export interface User {
  token: string | null;
  userId: number | null;
  name: string | null;
  email: string | null;
  userType: UserType | null;
}
