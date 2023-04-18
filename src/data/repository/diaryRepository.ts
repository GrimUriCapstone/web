import { useApi } from "@data/utils/useApi";
import { NotFound } from "@domain/errors/NotFound";
import { UnKnown } from "@domain/errors/UnKnown";
import { type Diary } from "@domain/models/diary";
import { type User } from "@domain/models/user";
import { AxiosError } from "axios";

interface DiaryRepository {
  postDiary: ({ title, content }: PostDiaryProps) => Promise<boolean>;
  getDiaries: () => Promise<Diary[]>;
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

  const getDiaries = async (): Promise<Diary[]> => {
    const result = await authApi.get("/diary/all");
    return result.data;
  };
  return { postDiary, getDiaries };
};
