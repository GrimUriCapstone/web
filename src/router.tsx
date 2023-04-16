import { SETTINGS_PAGE_PATH, SIGNUP_PAGE_PATH } from "@domain/constants/paths";
import { ProtectedRoute } from "@presentation/ProtectedRoute";
import { MainPage } from "@presentation/pages/MainPage";
import { SettingsPage } from "@presentation/pages/SettingsPage";
import { SignUpPage } from "@presentation/pages/SignUpPage";
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
        path: SIGNUP_PAGE_PATH,
        element: <SignUpPage />,
      },
      { path: SETTINGS_PAGE_PATH, element: <SettingsPage /> },
    ],
  },
]);
