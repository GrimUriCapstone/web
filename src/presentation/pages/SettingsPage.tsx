import { useFirebaseAuth } from "@data/utils/useFirebaseAuth";
import { useUser } from "@data/utils/useUser";
import { TopBar } from "@presentation/components/TopBar";

import { type ReactElement } from "react";

function AuthSetting(): ReactElement {
  const { login, accessToken, signOut, isLoading } = useFirebaseAuth();
  const { user } = useUser();
  if (isLoading) {
    return (
      <button className="btn btn-block">
        <progress className="progress progress-primary w-10" />
      </button>
    );
  }
  return (
    <div>
      {accessToken == null ? (
        <button
          onClick={() => {
            login();
          }}
          className="btn btn-block"
        >
          로그인
        </button>
      ) : (
        <>
          {" "}
          <button
            onClick={() => {
              signOut();
            }}
            className="btn btn-block"
          >
            로그아웃
          </button>
        </>
      )}
    </div>
  );
}

export function SettingsPage(): ReactElement {
  return (
    <div>
      <TopBar title={"설정"} />
      <AuthSetting />
    </div>
  );
}
