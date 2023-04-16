import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  browserLocalPersistence,
  setPersistence,
  type User,
} from "firebase/auth";
import { useEffect, useState } from "react";

interface UseFirebaseReturns {
  login: () => Promise<void>;
  user: Nullable<User>;
  isLoading: boolean;
  accessToken: Nullable<string>;
  signOut: () => Promise<void>;
}

export const useFirebaseAuth = (): UseFirebaseReturns => {
  const [user, setUser] = useState<Nullable<User>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<Nullable<string>>(null);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user != null) {
        setUser(user);
        updateInfo();
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const updateInfo = async (): Promise<void> => {
    if (user != null) {
      const token = await user.getIdToken();
      setAccessToken(token);
    }
  };
  const login = async (): Promise<void> => {
    setIsLoading(true);
    await setPersistence(auth, browserLocalPersistence);
    await signInWithRedirect(auth, provider);
    setIsLoading(false);
  };

  const signOut = async (): Promise<void> => {
    auth.signOut();
    setAccessToken(null);
    setUser(null);
  };
  return { login, user, isLoading, accessToken, signOut };
};
