import { useUserRepository } from "@data/repository/userRepository";
import { signOut, useAuthStore } from "@data/utils/useAuth";
import { useUserStore } from "@data/utils/useUser";

import { SIGNUP_PAGE_PATH } from "@domain/constants/paths";
import { NotFound } from "@domain/errors/NotFound";
import { UnAuthorized } from "@domain/errors/UnAuthorized";
import { LoadingModal } from "@presentation/common/components/LoadingModal";

import { useMutation } from "@tanstack/react-query";
import { useEffect, type ReactElement } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AuthProivder(): ReactElement {
  const { setUser } = useUserStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const needSignUp = useUserStore((state) => state.needSignUp);
  const { getUserInfo } = useUserRepository();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: async () => {
      if (accessToken == null || needSignUp) {
        throw new UnAuthorized();
      }
      const result = await getUserInfo();
      return result;
    },
    onSuccess(data) {
      setUser(data);
    },
    onError: (error) => {
      if (error instanceof NotFound) {
        useUserStore.setState({ needSignUp: true });
        navigate(SIGNUP_PAGE_PATH);
        return;
      }
      signOut();
      setUser(null);
    },
    retry: false,
  });

  useEffect(() => {
    mutate();
    const unsub = useAuthStore.subscribe((state, prevState) => {
      if (prevState.firebaseUser === null && state.firebaseUser != null) {
        mutate();
      }
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      {isLoading && <LoadingModal />}
      <Outlet />
    </>
  );
}
