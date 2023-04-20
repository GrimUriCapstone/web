import { type AlertColor } from "@mui/material";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface NotificationConfig {
  variant?: AlertColor;
  message?: string;
}
interface ShowSnackbarProps {
  snackbarConf: NotificationConfig;
  ms?: number;
}
interface NotificationState {
  snackbarConf: Nullable<NotificationConfig>;
  showSnackbar: ({ snackbarConf, ms }: ShowSnackbarProps) => void;
}
export const notificationStore = create<NotificationState>()(
  devtools((set) => ({
    snackbarConf: null,
    showSnackbar: ({ snackbarConf, ms = 3000 }: ShowSnackbarProps) => {
      set({ snackbarConf });
      setTimeout(() => {
        set({ snackbarConf: null });
      }, ms);
    },
  }))
);
