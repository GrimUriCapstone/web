import { Alert, Button, Snackbar, css } from "@mui/material";
import { notificationStore } from "@data/stores/notificationStore";

import { useState, type ReactElement, useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { useNavigate } from "react-router-dom";
import { NOTI_PAGE_PATH } from "@domain/constants/paths";

interface NotificationConfig {
  data: {
    diaryId?: string;
    diaryTitle?: string;
  };
  notification: {
    title: string;
    body: string;
  };
}

export function NotificationProvider(): ReactElement {
  const snackbarConf = notificationStore((state) => state.snackbarConf);
  const [notification, setNotification] =
    useState<Nullable<NotificationConfig>>(null);
  const requestPermission = (): void => {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        alert("일기 생성 알림을 받지 못합니다");
      }
    });
  };
  const messaging = getMessaging();
  const navigate = useNavigate();
  onMessage(messaging, (payload) => {
    setNotification(payload as NotificationConfig);
  });
  useEffect(() => {
    requestPermission();
  }, []);
  const hanldeNotificationClose = (): void => {
    setNotification(null);
  };
  return (
    <>
      {notification != null && (
        <Snackbar
          open={true}
          autoHideDuration={10000}
          onClose={hanldeNotificationClose}
          css={css`
            top: 50px;
            bottom: auto;
          `}
          ClickAwayListenerProps={{ onClickAway: () => null }}
          action={
            <>
              <Button
                size="small"
                onClick={() => {
                  navigate(NOTI_PAGE_PATH);
                  hanldeNotificationClose();
                }}
              >
                OPEN
              </Button>
              <Button
                color="inherit"
                size="small"
                onClick={(e) => {
                  hanldeNotificationClose();
                  e.stopPropagation();
                }}
              >
                close
              </Button>
            </>
          }
          message={notification.notification.body}
        />
      )}
      {snackbarConf != null && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          css={css`
            bottom: 50px;
          `}
        >
          <Alert
            severity={snackbarConf.variant}
            css={css`
              width: 100%;
            `}
          >
            {snackbarConf.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
