import { useUserRepository } from "@data/repository/userRepository";
import { NotFound } from "@domain/errors/NotFound";
import { type User } from "@domain/models/user";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useNavigate } from "react-router-dom";
import { SIGNUP_PAGE_PATH } from "@domain/constants/paths";

interface UserInfo {
  user: Nullable<User>;
}

export const useUser = (): UserInfo => {
  const [user, setUser] = useState<Nullable<User>>(null);
  const { getUserInfo } = useUserRepository();
  const { accessToken } = useFirebaseAuth();
  const navigate = useNavigate();
  const updateUserInfo = async (): Promise<void> => {
    const result = await getUserInfo();
    if (result.isFailure && result.error instanceof NotFound) {
      navigate(SIGNUP_PAGE_PATH);
      return;
    }
    if (result.isSuccess) {
      setUser(result.getValue());
    }
  };

  useEffect(() => {
    if (accessToken == null) {
      setUser(null);
      return;
    }
    updateUserInfo();
  }, [accessToken]);
  return { user };
};
