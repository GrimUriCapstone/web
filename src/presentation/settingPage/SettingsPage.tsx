import { useUserRepository } from "@data/repository/userRepository";
import {
  useAuthStore,
  signInWithGoogle,
  useAuthInitStore,
} from "@data/stores/authStore";
import { Button } from "@mui/material";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { LoadingModal } from "@presentation/common/components/LoadingModal";
import { TopBar } from "@presentation/common/components/TopBar";
import { type ReactElement } from "react";

function AuthSetting(): ReactElement {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { logout } = useUserRepository();

  return (
    <div>
      {accessToken == null ? (
        <Button
          variant="contained"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          로그인
        </Button>
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={() => {
              logout();
            }}
          >
            로그아웃
          </Button>
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
