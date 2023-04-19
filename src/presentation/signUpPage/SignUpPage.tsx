import { useUserRepository } from "@data/repository/userRepository";
import { signOut } from "@data/utils/useAuth";
import { useUserStore } from "@data/utils/useUser";
import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { ContentPadding } from "@presentation/common/atomics/Padding";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { TopBar } from "@presentation/common/components/TopBar";
import { useMutation } from "@tanstack/react-query";
import { useEffect, type ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm(): ReactElement {
  const [nickname, setNickname] = useState("");
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { postUserSignUp } = useUserRepository();
  const { mutate, isLoading, isError } = useMutation(postUserSignUp, {
    onSuccess: (data) => {
      setUser(data);
      navigate(HOME_PAGE_PATH);
    },
    onError: () => {
      alert("회원가입 실패!");
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

export function SignUpPage(): ReactElement {
  const [complete, setComplete] = useState(false);
  const { needSignUp } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!needSignUp) {
      navigate(HOME_PAGE_PATH);
      return;
    }

    return () => {
      if (complete) {
        return;
      }
      signOut();
    };
  }, []);
  return (
    <div>
      <TopBar title={"회원가입"} />
      <ContentPadding>
        <SignUpForm />
      </ContentPadding>
    </div>
  );
}
