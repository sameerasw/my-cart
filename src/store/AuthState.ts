import { UserType } from "../types/User";

export interface UserState {
  token: string | null;
  userId: number | null;
  name: string | null;
  email: string | null;
  userType: UserType | null;
}
