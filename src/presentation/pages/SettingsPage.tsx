import {
  signInWithGoogle,
  signOut,
  useAuthInitStore,
  useAuthStore,
} from "@data/utils/useAuth";
import { useUserStore } from "@data/utils/useUser";
import { LoadingModal } from "@presentation/components/LoadingModal";
import { TopBar } from "@presentation/components/TopBar";
import { useState, type ReactElement, useEffect } from "react";

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
  const init = useAuthInitStore((state) => state.init);

  return (
    <div>
      {!init && <LoadingModal />}
      <TopBar title={"설정"} />
      <AuthSetting />
    </div>
  );
}
