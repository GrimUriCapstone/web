import {
  DIARY_PAGE_PATH,
  NOTI_PAGE_PATH,
  SETTINGS_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  WRITE_PAGE_PATH,
} from "@domain/constants/paths";
import { ProtectedRoute } from "@presentation/ProtectedRoute";
import { DiaryPage } from "@presentation/diaryPage/DiaryPage";
import { MainPage } from "@presentation/mainPage/MainPage";
import { SettingsPage } from "@presentation/settingPage/SettingsPage";
import { SignUpPage } from "@presentation/signUpPage/SignUpPage";
import { WritePage } from "@presentation/writePage/WritePage";
import { AuthProivder } from "@presentation/providers/AuthProvider";
import { createBrowserRouter } from "react-router-dom";
import { DiaryDetailPage } from "@presentation/diaryDetailPage/DiaryDetailPage";
import { NotiPage } from "@presentation/notiPage/NotiPage";
import { SnackbarProvider } from "@presentation/providers/SnackbarProvider";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <AuthProivder />
        <SnackbarProvider />
      </>
    ),
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: SIGNUP_PAGE_PATH,
        element: <SignUpPage />,
      },
      {
        path: WRITE_PAGE_PATH,
        element: (
          <ProtectedRoute>
            <WritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: DIARY_PAGE_PATH,
        element: (
          <ProtectedRoute>
            <DiaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: `${DIARY_PAGE_PATH}/:diaryId`,
        element: (
          <ProtectedRoute>
            <DiaryDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: NOTI_PAGE_PATH,
        element: (
          <ProtectedRoute>
            <NotiPage />
          </ProtectedRoute>
        ),
      },
      { path: SETTINGS_PAGE_PATH, element: <SettingsPage /> },
    ],
  },
]);
