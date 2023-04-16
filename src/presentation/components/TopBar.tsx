import { ArrowLongIcon } from "@presentation/atomics/Icons";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps): ReactElement {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <button
          className="btn btn-circle btn-ghost"
          onClick={() => {
            navigate(-1);
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
