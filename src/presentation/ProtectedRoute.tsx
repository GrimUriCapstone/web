import { useAuthStore } from "@data/utils/useAuth";
import { AUTH_PAGE_PATH } from "@domain/constants/paths";

import { useEffect, type ReactElement, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  useEffect((): void => {
    if (accessToken == null) {
      navigate(AUTH_PAGE_PATH);
    }
  }, []);

  return <>{children}</>;
}
