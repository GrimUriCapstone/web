import { useApi } from "@data/hooks/useApi";
import { type Diary } from "@domain/models/diary";

interface DiaryRepository {
  postDiary: ({ title, content }: PostDiaryProps) => Promise<boolean>;
  getDiaries: () => Promise<Diary[]>;
  getDiary: (diaryId: number) => Promise<Diary>;
  postMainImage: (diaryId: number, imageId: number) => Promise<void>;
  removeDiary: (diaryId: number) => Promise<void>;
  getRecentDiaries: ({
    page,
  }: getRecentDiariesProps) => Promise<getRecentDiariesResponse>;
  getUnselectedCount: () => Promise<number>;
}

interface PostDiaryProps {
  title: string;
  content: string;
  open: boolean;
  styleId: number;
  themeId: number;
}

interface getRecentDiariesProps {
  page?: number;
}

interface getRecentDiariesResponse {
  content: Diary[];
  last: boolean;
}

export const useDirayRepository = (): DiaryRepository => {
  const { api, authApi } = useApi();

  const postDiary = async (props: PostDiaryProps): Promise<boolean> => {
    await authApi.post("/diary", props);
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
  const removeDiary = async (diaryId: number): Promise<void> => {
    await authApi.delete(`/diary/${diaryId}`);
  };

  const getRecentDiaries = async ({
    page = 0,
  }: getRecentDiariesProps): Promise<getRecentDiariesResponse> => {
    const result = await authApi.get(
      `/diary/recent?sort=createdAt,DESC&page=${page}&size=3`
    );
    return result.data;
  };

  const getUnselectedCount = async (): Promise<number> => {
    const result = await authApi.get("/diary/count");
    return result.data;
  };
  return {
    postDiary,
    getDiaries,
    getDiary,
    postMainImage,
    removeDiary,
    getRecentDiaries,
    getUnselectedCount,
  };
};
