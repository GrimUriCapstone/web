import { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_PATH } from "@constants/paths";
import { useFirebaseAuth } from "@utils/useFirebaseAuth";
export function AuthPage(): ReactElement {
  const { login, credential, isLoading } = useFirebaseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (credential == null) return;
    navigate(HOME_PAGE_PATH);
  }, [credential]);
  return (
    <div>
      <p>{credential?.accessToken}</p>
      <button
        className={isLoading ? "btn btn-disabled" : "btn btn-primary"}
        onClick={() => {
          login();
        }}
      >
        login
      </button>
    </div>
  );
}
