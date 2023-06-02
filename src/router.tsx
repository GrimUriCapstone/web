import {
  DIARY_PAGE_PATH,
  DIARY_STATISTICS_PAGE_PATH,
  NOTI_PAGE_PATH,
  SELECT_PAGE_PATH,
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
import { NotificationProvider } from "@presentation/providers/NotificationProvider";
import { SelectPage } from "@presentation/selectPage/SelectPage";
import { StatisticsPage } from "@presentation/statisticsPage/StatisticsPage";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <AuthProivder />
        <NotificationProvider />
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
        path: `${DIARY_PAGE_PATH}${DIARY_STATISTICS_PAGE_PATH}`,
        element: (
          <ProtectedRoute>
            <StatisticsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: `${DIARY_PAGE_PATH}/:diaryId`,
        element: <DiaryDetailPage />,
      },
      {
        path: NOTI_PAGE_PATH,
        element: (
          <ProtectedRoute>
            <NotiPage />
          </ProtectedRoute>
        ),
      },
      {
        path: `${SELECT_PAGE_PATH}/:diaryId`,
        element: (
          <ProtectedRoute>
            <SelectPage />
          </ProtectedRoute>
        ),
      },
      { path: SETTINGS_PAGE_PATH, element: <SettingsPage /> },
    ],
  },
]);
