import { useApi } from "@data/utils/useApi";
import { NotFound } from "@domain/errors/NotFound";
import { UnKnown } from "@domain/errors/UnKnown";
import { type User } from "@domain/models/user";
import { AxiosError } from "axios";

interface DiaryRepository {
  postDiary: ({ title, content }: PostDiaryProps) => Promise<boolean>;
}

interface PostDiaryProps {
  title: string;
  content: string;
}
export const useDirayRepository = (): DiaryRepository => {
  const { api, authApi } = useApi();

  const postDiary = async ({
    title,
    content,
  }: PostDiaryProps): Promise<boolean> => {
    await authApi.post("/diary", { title, content });
    return true;
  };
  return { postDiary };
};
