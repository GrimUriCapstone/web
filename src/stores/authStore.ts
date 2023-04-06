import { create } from "zustand";

interface AuthState {
  accessToken?: Nullable<string>;
  refreshToken?: Nullable<string>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
}));
