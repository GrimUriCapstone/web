import { useDirayRepository } from "@data/repository/diaryRepository";
import { notificationStore } from "@data/stores/notificationStore";
import { DIARY_PAGE_PATH } from "@domain/constants/paths";
import { type Diary } from "@domain/models/diary";
import { type ServerError } from "@domain/models/error";
import { Badge, css } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  type PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Img } from "@presentation/common/atomics/Image";

import { pageWidthStyle } from "@presentation/common/atomics/PageContent";
import { DiaryPreview } from "@presentation/common/components/DiaryPreview";
import { TopBar } from "@presentation/common/components/TopBar";
import { useQuery } from "@tanstack/react-query";
import dayjs, { type Dayjs } from "dayjs";
import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import ko from "dayjs/locale/ko";
const CustomDay = (
  props: PickersDayProps<Dayjs> & { highlightedDays?: Map<string, Diary[]> }
): ReactElement => {
  const {
    highlightedDays = new Map<string, Diary>(),
    day,
    outsideCurrentMonth,
    ...other
  } = props;

  const isSelected = highlightedDays.has(day.format("YYYY-MM-DD"));
  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      css={
        isSelected &&
        css`
          background-color: #45bcb1;
          box-shadow: 1px 1px 0 0px #434343;
        `
      }
    />
  );
};
export const StatisticsPage = (): ReactElement => {
  dayjs.locale(ko);
  const { getDiaries } = useDirayRepository();
  const { showSnackbar } = notificationStore();
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const { data: diaries } = useQuery(["diary", "getDiaries"], getDiaries, {
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
  });

  const highlightedDays = new Map<string, Diary[]>();
  diaries?.forEach((diary) => {
    const day = dayjs(diary.createdAt).format("YYYY-MM-DD");
    if (highlightedDays.has(day)) {
      highlightedDays.get(day)?.push(diary);
      return;
    }

    highlightedDays.set(day, [diary]);
  });
  return (
    <>
      <TopBar title="내 기록" />
      <div css={[pageWidthStyle]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            onChange={(date) => {
              setCurrentDate(date?.format("YYYY-MM-DD") ?? null);
            }}
            slots={{
              day: CustomDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
          />
        </LocalizationProvider>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          `}
        >
          {currentDate != null &&
            highlightedDays.get(currentDate)?.map((diary) => {
              if (diary.mainImageUrl == null) return null;
              return (
                <Link
                  to={`${DIARY_PAGE_PATH}/${diary.diaryId}`}
                  key={diary.diaryId}
                >
                  <Img
                    src={diary.mainImageUrl.imageUrl}
                    css={css`
                      width: 100%;
                      border-radius: 10px;
                    `}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};
