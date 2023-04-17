import { useUserRepository } from "@data/repository/userRepository";
import { signOut, useAuthStore } from "@data/utils/useAuth";
import { useUserStore } from "@data/utils/useUser";
import { HOME_PAGE_PATH, SIGNUP_PAGE_PATH } from "@domain/constants/paths";
import { NotFound } from "@domain/errors/NotFound";
import { LoadingModal } from "@presentation/components/LoadingModal";
import { useQuery } from "@tanstack/react-query";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function AuthPage(): ReactElement {
  const accessToken = useAuthStore((state) => state.accessToken);
  const needSignUp = useUserStore((state) => state.needSignUp);
  const { getUserInfo } = useUserRepository();
  const navigate = useNavigate();
  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (accessToken == null || needSignUp) {
        return null;
      }
      const result = await getUserInfo();
      useUserStore.setState({ user: result, needSignUp: false });
    },
    onError: (error) => {
      if (error instanceof NotFound) {
        useUserStore.setState({ needSignUp: true });
        navigate(SIGNUP_PAGE_PATH);
        return;
      }
      signOut();
      navigate(HOME_PAGE_PATH);
      alert("로그인 실패!");
    },
    retry: false,
  });
  return <>{isLoading && <LoadingModal />}</>;
}
