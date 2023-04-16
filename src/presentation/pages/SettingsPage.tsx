import { TopBar } from "@presentation/components/TopBar";
import { useFirebaseAuth } from "@utils/useFirebaseAuth";
import { type ReactElement } from "react";

function AuthSetting(): ReactElement {
  const { user, login, accessToken, signOut, isLoading } = useFirebaseAuth();

  if (isLoading) {
    return (
      <button className="btn btn-block">
        <progress className="progress progress-primary w-10" />
      </button>
    );
  }
  return (
    <div>
      {user == null ? (
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
