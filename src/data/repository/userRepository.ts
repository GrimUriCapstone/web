import { useApi } from "@data/utils/useApi";
import { NotFound } from "@domain/errors/NotFound";
import { UnKnown } from "@domain/errors/UnKnown";
import { type User } from "@domain/models/user";
import { Result } from "@domain/result";
import { AxiosError } from "axios";

interface UserRepository {
  getUserInfo: () => Promise<Result<User>>;
}

export const useUserRepository = (): UserRepository => {
  const { api, authApi } = useApi();

  const getUserInfo = async (): Promise<Result<User>> => {
    try {
      const result = await authApi.get("/user/whoami");
      return Result.ok(result.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
          return Result.fail(new NotFound());
        }
      }
      return Result.fail(new UnKnown("un"));
    }
  };

  return { getUserInfo };
};
