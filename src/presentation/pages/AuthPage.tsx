import { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_PATH } from "@domain/constants/paths";
import { useFirebaseAuth } from "@data/utils/useFirebaseAuth";

export function AuthPage(): ReactElement {
  const { login, user, isLoading } = useFirebaseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (user == null) {
      login();
      return;
    }
    navigate(HOME_PAGE_PATH);
  }, [user, isLoading]);
  return (
    <div>
      <progress className="progress w-56"></progress>
    </div>
  );
}
