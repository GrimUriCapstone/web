import { useDirayRepository } from "@data/repository/diaryRepository";
import { parseNumber } from "@data/utils/parseNumber";
import { DIARY_PAGE_PATH } from "@domain/constants/paths";
import { UnKnown } from "@domain/errors/UnKnown";
import { Typography, css } from "@mui/material";
import { Img } from "@presentation/common/atomics/Image";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { PaperArea } from "@presentation/common/components/PaperTextArea";
import { TopBar } from "@presentation/common/components/TopBar";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function DiaryDetailPage(): ReactElement {
  const { diaryId } = useParams();
  const { getDiary } = useDirayRepository();
  const { data, isLoading } = useQuery(
    ["getDiary"],
    async () => {
      const id = parseNumber(diaryId);
      if (id === undefined) {
        throw new UnKnown("no number");
      }
      return await getDiary(id);
    },
    {
      onError: () => {},
    }
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (diaryId === undefined) {
      navigate(DIARY_PAGE_PATH);
    }
  }, []);

  if (isLoading) {
    return <LoadingModal />;
  }
  return (
    <>
      <TopBar title={data!.title} to={DIARY_PAGE_PATH} />
      <ContentPadding>
        <Img
          src={""}
          css={css`
            border-radius: 32px;
            width: 100%;
          `}
        />
        <Typography variant="h5">{data!.title}</Typography>
        <Typography>{data!.originalContent}</Typography>
      </ContentPadding>
    </>
  );
}
