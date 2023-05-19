import { useApi } from "@data/hooks/useApi";
import { getMessagingToken } from "@data/utils/firebaseInit";
import { NotFound } from "@domain/errors/NotFound";
import { UnKnown } from "@domain/errors/UnKnown";
import { type User } from "@domain/models/user";
import { AxiosError } from "axios";

interface UserRepository {
  getUserInfo: () => Promise<User>;
  postUserSignUp: ({ nickname }: PostUserSignUpProps) => Promise<User>;
  fcmTest: () => void;
}

interface PostUserSignUpProps {
  nickname: string;
}

export const useUserRepository = (): UserRepository => {
  const { api, authApi } = useApi();
  const fcmTest = (): void => {
    authApi.get("/fcm/notification-test?diaryId=3&diaryTitle=hi");
  };
  const postFcmToken = async (): Promise<void> => {
    try {
      const token = await getMessagingToken();
      const result = await authApi.post("/user/fcmtoken", { fcm_token: token });
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
          throw new NotFound();
        }
      }
      throw error;
    }
  };
  const getUserInfo = async (): Promise<User> => {
    try {
      const result = await authApi.get("/user/whoami");
      await postFcmToken();
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
          throw new NotFound();
        }
      }
      throw error;
    }
  };

  const postUserSignUp = async ({
    nickname,
  }: PostUserSignUpProps): Promise<User> => {
    const result = await authApi.post("/user/signup", { nickname });
    return result.data;
  };

  return { getUserInfo, postUserSignUp, fcmTest };
};
