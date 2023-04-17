import { signInWithRedirect, type User as FirebaseUser } from "firebase/auth";
import { create } from "zustand";
import { auth, googleAuthProvider } from "./useFirebase";
import { devtools, persist } from "zustand/middleware";

interface AuthStore {
  firebaseUser: Nullable<FirebaseUser>;
  accessToken: Nullable<string>;
  isLoading: boolean;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        firebaseUser: null,
        accessToken: null,
        isLoading: true,
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
  useAuthStore.setState({ isLoading: true });
  if (firebaseUser != null) {
    const tokenResult = await firebaseUser.getIdTokenResult();
    useAuthStore.setState({
      firebaseUser,
      accessToken: tokenResult.token,
      isLoading: false,
    });
  } else {
    useAuthStore.setState({
      firebaseUser: null,
      accessToken: null,
      isLoading: false,
    });
  }
});
