import { useUserRepository } from "@data/repository/userRepository";
import { notificationStore } from "@data/stores/notificationStore";
import { useUserStore } from "@data/stores/userStore";
import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { type SerializedStyles } from "@emotion/react";

import {
  Button,
  TextField,
  css,
  Checkbox,
  useTheme,
  type Theme,
} from "@mui/material";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { useMutation } from "@tanstack/react-query";
import { type ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm(): ReactElement {
  const [nickname, setNickname] = useState("");
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { postUserSignUp } = useUserRepository();
  const { showSnackbar } = notificationStore();
  const { mutate, isLoading } = useMutation(postUserSignUp, {
    onSuccess: (data) => {
      setUser(data);
      navigate(HOME_PAGE_PATH);
    },
    onError: () => {
      showSnackbar({
        snackbarConf: { variant: "error", message: "회원가입 실패" },
      });
    },
  });
  const handleSubmit = (): void => {
    mutate({ nickname });
  };
  const theme = useTheme();
  return (
    <>
      {isLoading && <LoadingModal />}
      <TextField
        id="outlined-basic"
        label="Nickname"
        variant="outlined"
        css={css`
          width: 100%;
          max-width: 300px;
        `}
        inputProps={{ maxLength: 20 }}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      />
      <div
        css={css`
          width: 100%;
          max-width: 300px;
          font-size: 13px;
          display: flex;
          flex-direction: column;
          align-items: end;
        `}
      >
        <div>
          <Checkbox />
          <label>
            <Link
              target="_blank"
              to={
                "https://meadow-locust-124.notion.site/b6efb378d4ab485a8f7c11551b8ced13"
              }
              css={linkStyles(theme)}
            >
              이용 약관
            </Link>
            에 동의합니다.
          </label>
        </div>
        <div>
          <Checkbox />
          <label>
            <Link
              target="_blank"
              to={
                "https://meadow-locust-124.notion.site/196322b07bc24a0db86ad9ee74d3ee66"
              }
              css={linkStyles(theme)}
            >
              개인정보이용방침
            </Link>
            에 동의합니다.
          </label>
        </div>
      </div>
      <Button
        variant="contained"
        onClick={handleSubmit}
        css={css`
          width: 100%;
          max-width: 300px;
        `}
      >
        회원가입하기
      </Button>
    </>
  );
}

const linkStyles = (theme: Theme): SerializedStyles => css`
  color: ${theme.palette.primary.main};
`;
