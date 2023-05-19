import { type AlertColor } from "@mui/material";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface SnackbarConfig {
  variant?: AlertColor;
  message?: string;
}

interface ShowSnackbarProps {
  snackbarConf: SnackbarConfig;
  ms?: number;
}
interface NotificationState {
  snackbarConf: Nullable<SnackbarConfig>;
  sub: Nullable<NodeJS.Timeout>;
  showSnackbar: ({ snackbarConf, ms }: ShowSnackbarProps) => void;
}
export const notificationStore = create<NotificationState>()(
  devtools((set) => ({
    sub: null,
    snackbarConf: null,
    showSnackbar: ({ snackbarConf, ms = 3000 }: ShowSnackbarProps) => {
      set({ snackbarConf });
      const timeOut = setTimeout(() => {
        set({ snackbarConf: null });
      }, ms);
      set(({ sub }) => {
        if (sub != null) {
          clearTimeout(sub);
        }
        return { sub: timeOut };
      });
    },
  }))
);
