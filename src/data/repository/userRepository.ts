import { useApi } from "@data/hooks/useApi";
import { NotFound } from "@domain/errors/NotFound";
import { UnKnown } from "@domain/errors/UnKnown";
import { type User } from "@domain/models/user";
import { AxiosError } from "axios";

interface UserRepository {
  getUserInfo: () => Promise<User>;
  postUserSignUp: ({ nickname }: PostUserSignUpProps) => Promise<User>;
}

interface PostUserSignUpProps {
  nickname: string;
}

export const useUserRepository = (): UserRepository => {
  const { api, authApi } = useApi();

  const getUserInfo = async (): Promise<User> => {
    try {
      const result = await authApi.get("/user/whoami");
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
          throw new NotFound();
        }
      }
      throw new UnKnown("un");
    }
  };

  const postUserSignUp = async ({
    nickname,
  }: PostUserSignUpProps): Promise<User> => {
    const result = await authApi.post("/user/signup", { nickname });
    return result.data;
  };

  return { getUserInfo, postUserSignUp };
};
