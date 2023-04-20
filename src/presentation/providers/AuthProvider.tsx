import { useUserRepository } from "@data/repository/userRepository";
import { signOut, useAuthStore } from "@data/stores/authStore";
import { useUserStore } from "@data/stores/userStore";

import { SIGNUP_PAGE_PATH } from "@domain/constants/paths";
import { NotFound } from "@domain/errors/NotFound";
import { UnAuthorized } from "@domain/errors/UnAuthorized";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { notificationStore } from "@data/stores/notificationStore";

import { useMutation } from "@tanstack/react-query";
import { useEffect, type ReactElement } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AuthProivder(): ReactElement {
  const { setUser, user } = useUserStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const needSignUp = useUserStore((state) => state.needSignUp);
  const { getUserInfo } = useUserRepository();
  const { showSnackbar } = notificationStore();
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
      showSnackbar({
        snackbarConf: {
          message: "로그인 완료!",
          variant: "info",
        },
      });
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
    if (accessToken != null) {
      mutate();
    }
    const unsub = useAuthStore.subscribe((state, prevState) => {
      if (prevState.firebaseUser === null && state.firebaseUser != null) {
        mutate();
      }
      if (prevState.firebaseUser != null && state.firebaseUser === null) {
        showSnackbar({
          snackbarConf: {
            message: "로그아웃 완료",
            variant: "info",
          },
        });
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
