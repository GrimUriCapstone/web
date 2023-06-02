import { useDirayRepository } from "@data/repository/diaryRepository";
import { notificationStore } from "@data/stores/notificationStore";
import { type Diary } from "@domain/models/diary";
import { TopBar } from "@presentation/common/components/TopBar";
import { useQuery } from "@tanstack/react-query";
import { type ReactElement } from "react";
import {
  SelectImageNoti,
  SelectImageNotiSkelton,
} from "./components/SelectImageNoti";
import { type ServerError } from "@domain/models/error";

export function NotiPage(): ReactElement {
  const { getDiaries } = useDirayRepository();
  const { showSnackbar } = notificationStore();
  const { data: diaries, isLoading } = useQuery(
    ["diary", "getDiaries", "filter"],
    async () => {
      const result = await getDiaries();
      return result.filter((diary: Diary) => {
        if (diary.imageSelected) return false;
        return true;
      });
    },
    {
      onError: () => {
        showSnackbar({
          snackbarConf: { variant: "error", message: "다이어리 가져오기 실패" },
        });
      },
      retry: (_, error) => {
        if ((error as ServerError).response.status === 429) {
          return false;
        }
        return true;
      },
    }
  );

  return (
    <>
      <TopBar title="알림" />
      {isLoading && new Array(5).map((_) => <SelectImageNotiSkelton key={_} />)}
      {diaries?.map((diary) => {
        return <SelectImageNoti diary={diary} key={diary.diaryId} />;
      })}
    </>
  );
}
