import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  browserLocalPersistence,
  setPersistence,
  type User as FirebaseUser,
} from "firebase/auth";
import { useEffect, useState } from "react";

interface FirebaseAuth {
  login: () => Promise<void>;
  isLoading: boolean;
  accessToken: Nullable<string>;
  signOut: () => Promise<void>;
  updateAccessToken: () => Promise<void>;
}

export const useFirebaseAuth = (): FirebaseAuth => {
  const [firebaseUser, setFirebaseUser] =
    useState<Nullable<FirebaseUser>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<Nullable<string>>(null);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser != null) {
        setFirebaseUser(firebaseUser);
        updateAccessToken().then(() => {
          setIsLoading(false);
        });
      } else {
        setFirebaseUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const updateAccessToken = async (): Promise<void> => {
    if (firebaseUser != null) {
      const token = await firebaseUser.getIdToken();
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
  };
  return { login, isLoading, accessToken, signOut, updateAccessToken };
};
