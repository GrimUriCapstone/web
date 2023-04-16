import { type User } from "@domain/models/user";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

interface UserState {
  user: Nullable<User>;
  needSignUp: boolean;
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: null,
    needSignUp: false,
  }))
);
