import { AUTH_PAGE_PATH } from "@constants/paths";
import { ProtectedRoute } from "@presentation/ProtectedRoute";
import { AuthPage } from "@presentation/pages/AuthPage";
import { MainPage } from "@presentation/pages/MainPage";
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
    path: AUTH_PAGE_PATH,
    element: <AuthPage />,
  },
]);
