import { useUserRepository } from "@data/repository/userRepository";
import { useAuthStore } from "@data/utils/useAuth";
import { useUserStore } from "@data/utils/useUser";
import { SIGNUP_PAGE_PATH } from "@domain/constants/paths";
import { NotFound } from "@domain/errors/NotFound";
import { useQuery } from "@tanstack/react-query";
import { type ReactElement } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AuthProivder(): ReactElement {
  const accessToken = useAuthStore((state) => state.accessToken);
  const needSignUp = useUserStore((state) => state.needSignUp);
  const { getUserInfo } = useUserRepository();
  const navigate = useNavigate();
  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      console.log(accessToken);
      if (accessToken == null || needSignUp) {
        return null;
      }
      const result = await getUserInfo();
      useUserStore.setState({ user: result });
    },
    onError: (error) => {
      if (error instanceof NotFound) {
        useUserStore.setState({ needSignUp: true });
        navigate(SIGNUP_PAGE_PATH);
      }
    },
    retry: false,
  });
  return (
    <>
      {isLoading && (
        <div className="absolute z-[10000] flex h-screen w-screen items-center justify-center bg-black">
          <progress className="progress progress-primary mx-10 w-full" />
        </div>
      )}
      <Outlet />
    </>
  );
}
