import { SETTINGS_PAGE_PATH, SIGNUP_PAGE_PATH } from "@domain/constants/paths";
import { ProtectedRoute } from "@presentation/ProtectedRoute";
import { MainPage } from "@presentation/pages/MainPage";
import { SettingsPage } from "@presentation/pages/SettingsPage";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/secret",
    element: (
      <ProtectedRoute>
        <div>비밀</div>
      </ProtectedRoute>
    ),
  },
  {
    path: SIGNUP_PAGE_PATH,
    element: <div>회원가입</div>,
  },
  { path: SETTINGS_PAGE_PATH, element: <SettingsPage /> },
]);
