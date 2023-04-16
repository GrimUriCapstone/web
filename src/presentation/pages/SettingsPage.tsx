import { signInWithGoogle, signOut, useAuthStore } from "@data/utils/useAuth";
import { TopBar } from "@presentation/components/TopBar";
import { type ReactElement } from "react";

function AuthSetting(): ReactElement {
  const accessToken = useAuthStore((state) => state.accessToken);
  return (
    <div>
      {accessToken == null ? (
        <button
          onClick={() => {
            signInWithGoogle();
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
