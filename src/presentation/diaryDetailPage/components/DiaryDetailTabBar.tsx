import { type Diary } from "@domain/models/diary";
import { css } from "@emotion/react";
import { IconButton } from "@mui/material";
import { AbsoluteTobBar } from "@presentation/common/components/TopBar";
import { type ReactElement } from "react";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import { notificationStore } from "@data/stores/notificationStore";
import { useUserStore } from "@data/stores/userStore";
import { toPng } from "html-to-image";
interface DiaryDetailTabBarProps {
  diary: Diary;
}
export const DiaryDetailTabBar = ({
  diary,
}: DiaryDetailTabBarProps): ReactElement => {
  const { showSnackbar } = notificationStore();
  const { user } = useUserStore();
  return (
    <AbsoluteTobBar
      to={".."}
      actions={[
        user != null && user.email === diary.email ? (
          <IconButton
            key={2}
            css={css`
              background-color: #f0f8ff85;
            `}
            onClick={() => {
              const elem = document.getElementById("diary-content");
              if (elem === null) return;
              toPng(elem, {
                quality: 0.95,
              }).then(function (dataUrl) {
                const link = document.createElement("a");
                link.download = `${diary.title}.png`;
                link.href = dataUrl;
                link.click();
              });
            }}
          >
            <DownloadIcon />
          </IconButton>
        ) : (
          <></>
        ),
        <IconButton
          key={1}
          css={css`
            background-color: #f0f8ff85;
          `}
          onClick={() => {
            navigator.clipboard.writeText(location.href);
            showSnackbar({
              snackbarConf: {
                variant: "info",
                message: "클립보드에 복사되었습니다.",
              },
            });
          }}
        >
          <ShareIcon />
        </IconButton>,
      ]}
    />
  );
};
