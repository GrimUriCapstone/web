import { useAuthInitStore, useAuthStore } from "@data/stores/authStore";
import { notificationStore } from "@data/stores/notificationStore";
import { useUserStore } from "@data/stores/userStore";
import { HOME_PAGE_PATH, SETTINGS_PAGE_PATH } from "@domain/constants/paths";

import { useEffect, type ReactElement, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement {
  const { accessToken } = useAuthStore();
  const { user } = useUserStore();
  const { showSnackbar } = notificationStore();
  const { init } = useAuthInitStore();
  const navigate = useNavigate();
  useEffect((): void => {
    if ((accessToken == null || user == null) && init) {
      navigate(SETTINGS_PAGE_PATH);
      showSnackbar({
        snackbarConf: { variant: "warning", message: "로그인 해주세요" },
      });
    }
  }, [init]);

  return <>{children}</>;
}
