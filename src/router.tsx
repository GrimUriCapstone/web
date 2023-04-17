import {
  AUTH_PAGE_PATH,
  SETTINGS_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  WRITE_PAGE_PATH,
} from "@domain/constants/paths";
import { ProtectedRoute } from "@presentation/ProtectedRoute";
import { AuthPage } from "@presentation/pages/AuthPage";
import { MainPage } from "@presentation/pages/MainPage";
import { SettingsPage } from "@presentation/pages/SettingsPage";
import { SignUpPage } from "@presentation/pages/SignUpPage";
import { WritePage } from "@presentation/pages/WritePage";
import { AuthProivder } from "@presentation/providers/AuthProvider";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
  {
    element: <AuthProivder />,
    children: [
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
        path: AUTH_PAGE_PATH,
        element: <AuthPage />,
      },
      {
        path: SIGNUP_PAGE_PATH,
        element: <SignUpPage />,
      },
      {
        path: WRITE_PAGE_PATH,
        element: <WritePage />,
      },
      { path: SETTINGS_PAGE_PATH, element: <SettingsPage /> },
    ],
  },
]);
