import { signOut } from "@data/stores/authStore";
import { useUserStore } from "@data/stores/userStore";
import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { TopBar } from "@presentation/common/components/TopBar";
import { useEffect, type ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "./components/SignUpForm";

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
