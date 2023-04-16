import { signOut } from "@data/utils/useAuth";
import { useUserStore } from "@data/utils/useUser";
import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { TopBar } from "@presentation/components/TopBar";
import { useEffect, type ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <h1>sdadasdsad</h1>
    </div>
  );
}
