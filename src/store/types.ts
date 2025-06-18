import { UserState } from "./AuthState";
import { CartState } from "./CartState";

export interface RootState {
  auth: UserState;
  cart: CartState;
  itemApi: any;
  sessionApi: any;
  cartApi: any;
  ratingApi: any;
}

export type AppDispatch = any;
