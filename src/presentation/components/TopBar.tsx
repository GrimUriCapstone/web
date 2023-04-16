import { HOME_PAGE_PATH } from "@constants/paths";
import { ArrowLongIcon } from "@presentation/atomics/Icons";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  title: string;
  to?: string;
}

export function TopBar({
  title,
  to = HOME_PAGE_PATH,
}: TopBarProps): ReactElement {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <button
          className="btn btn-circle btn-ghost"
          onClick={() => {
            navigate(to);
          }}
        >
          <ArrowLongIcon />
        </button>
      </div>
      <div className="navbar-center">
        <h2>{title}</h2>
      </div>
    </div>
  );
}
