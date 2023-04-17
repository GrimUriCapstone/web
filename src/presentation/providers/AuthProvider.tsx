import { useAuthStore } from "@data/utils/useAuth";

import { AUTH_PAGE_PATH, SIGNUP_PAGE_PATH } from "@domain/constants/paths";
import { useEffect, type ReactElement } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AuthProivder(): ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = useAuthStore.subscribe((state, prevState) => {
      if (prevState.firebaseUser === null && state.firebaseUser != null) {
        navigate(AUTH_PAGE_PATH);
      }
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
