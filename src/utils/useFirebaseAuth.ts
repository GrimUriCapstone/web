import { HOME_PAGE_PATH } from "@constants/paths";
import {
  GoogleAuthProvider,
  type OAuthCredential,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseFirebaseAuthProps {}

interface UseFirebaseReturns {
  login: () => Promise<void>;
  credential: Nullable<OAuthCredential>;
  isLoading: boolean;
}

export const useFirebaseAuth = (): UseFirebaseReturns => {
  const [credential, setCredential] = useState<Nullable<OAuthCredential>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    updateCredential().then(() => {
      setIsLoading(false);
    });
  }, []);
  const updateCredential = async (): Promise<void> => {
    await getRedirectResult(auth)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setCredential(credential);
        // navigate(HOME_PAGE_PATH);
      })
      .catch(() => {
        setCredential(null);
      });
  };
  const login = async (): Promise<void> => {
    await signInWithRedirect(auth, provider);
  };
  return { login, credential, isLoading };
};
