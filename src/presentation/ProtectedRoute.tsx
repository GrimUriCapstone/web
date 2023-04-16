import { AUTH_PAGE_PATH } from "@domain/constants/paths";
import { useAuthStore } from "@stores/authStore";
import { useEffect, type ReactElement, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement {
  const { accessToken, refreshToken } = useAuthStore();
  const navigate = useNavigate();
  useEffect((): void => {
    if (accessToken == null || refreshToken == null) {
      navigate(AUTH_PAGE_PATH);
    }
  }, []);

  return <>{children}</>;
}
