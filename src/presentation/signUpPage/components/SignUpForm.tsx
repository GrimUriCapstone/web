import { useUserRepository } from "@data/repository/userRepository";
import { notificationStore } from "@data/stores/notificationStore";
import { useUserStore } from "@data/stores/userStore";
import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { useMutation } from "@tanstack/react-query";
import { type ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUpForm(): ReactElement {
  const [nickname, setNickname] = useState("");
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { postUserSignUp } = useUserRepository();
  const { showSnackbar } = notificationStore();
  const { mutate, isLoading, isError } = useMutation(postUserSignUp, {
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

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Nickname</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          maxLength={20}
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </div>
      <input type="submit" onClick={handleSubmit} />
    </>
  );
}
