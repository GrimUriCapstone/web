import { type ReactElement } from "react";

export function LoadingModal(): ReactElement {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 opacity-50">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4"></div>
    </div>
  );
}
