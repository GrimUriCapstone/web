import { signInWithRedirect, type User as FirebaseUser } from "firebase/auth";
import { create } from "zustand";
import { auth, googleAuthProvider } from "./useFirebase";
import { devtools, persist } from "zustand/middleware";

interface AuthStore {
  firebaseUser: Nullable<FirebaseUser>;
  accessToken: Nullable<string>;
}

interface AuthInitStore {
  init: boolean;
}
export const useAuthInitStore = create<AuthInitStore>()(
  devtools((set) => ({
    init: false,
  }))
);
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        firebaseUser: null,
        accessToken: null,
      }),
      { name: "auth-storage" }
    )
  )
);

export const signInWithGoogle = async (): Promise<void> => {
  try {
    await signInWithRedirect(auth, googleAuthProvider);
  } catch (error) {
    console.warn(error);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
    useAuthStore.setState({
      firebaseUser: null,
      accessToken: null,
    });
  } catch (error) {
    console.warn(error);
  }
};

auth.onAuthStateChanged(async (firebaseUser) => {
  if (firebaseUser != null) {
    const tokenResult = await firebaseUser.getIdTokenResult();
    useAuthStore.setState({
      firebaseUser,
      accessToken: tokenResult.token,
    });
    useAuthInitStore.setState({
      init: true,
    });
  } else {
    useAuthStore.setState({
      firebaseUser: null,
      accessToken: null,
    });
    useAuthInitStore.setState({
      init: true,
    });
  }
});
