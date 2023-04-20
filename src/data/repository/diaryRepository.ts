import { useApi } from "@data/hooks/useApi";
import { type Diary } from "@domain/models/diary";

interface DiaryRepository {
  postDiary: ({ title, content }: PostDiaryProps) => Promise<boolean>;
  getDiaries: () => Promise<Diary[]>;
  getDiary: (diaryId: number) => Promise<Diary>;
  postMainImage: (diaryId: number, imageId: number) => Promise<void>;
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

  const getDiary = async (diaryId: number): Promise<Diary> => {
    const result = await authApi.get(`/diary/${diaryId}`);
    return result.data;
  };

  const postMainImage = async (
    diaryId: number,
    imageId: number
  ): Promise<void> => {
    await authApi.post(`/diary/${diaryId}/image/${imageId}`);
  };
  return { postDiary, getDiaries, getDiary, postMainImage };
};
