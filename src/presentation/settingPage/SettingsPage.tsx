import {
  signInWithGoogle,
  signOut,
  useAuthInitStore,
  useAuthStore,
} from "@data/stores/authStore";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { TopBar } from "@presentation/common/components/TopBar";
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
      <ContentPadding>
        <AuthSetting />
      </ContentPadding>
    </div>
  );
}
