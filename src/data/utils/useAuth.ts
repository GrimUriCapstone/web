import { signInWithRedirect, type User as FirebaseUser } from "firebase/auth";
import { create } from "zustand";
import { auth, googleAuthProvider } from "./useFirebase";
import { devtools, persist } from "zustand/middleware";

interface AuthStore {
  firebaseUser: Nullable<FirebaseUser>;
  accessToken: Nullable<string>;
  needSignUp: boolean;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        firebaseUser: null,
        accessToken: null,
        needSignUp: false,
      }),
      { name: "auth-storage" }
    )
  )
);

export const signInWithGoogle = async (): Promise<void> => {
  try {
    await signInWithRedirect(auth, googleAuthProvider);
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
    useAuthStore.setState({
      firebaseUser: null,
      accessToken: null,
      needSignUp: false,
    });
  } catch (error) {
    console.log(error);
  }
};

auth.onAuthStateChanged(async (firebaseUser) => {
  if (firebaseUser != null) {
    const tokenResult = await firebaseUser.getIdTokenResult();
    useAuthStore.setState({ firebaseUser, accessToken: tokenResult.token });
  } else {
    useAuthStore.setState({ firebaseUser: null, accessToken: null });
  }
});
