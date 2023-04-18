import { CircularProgress } from "@mui/material";
import { type ReactElement } from "react";

export function LoadingModal(): ReactElement {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 opacity-50">
      <CircularProgress />
    </div>
  );
}
