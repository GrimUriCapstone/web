import { WRITE_PAGE_PATH } from "@domain/constants/paths";
import { HomeIcon, WriteIcon, BookIcon } from "@presentation/atomics/Icons";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";

interface BottonNavigationBarProps {
  activeIdx: number;
}
export function BottonNavigationBar({
  activeIdx,
}: BottonNavigationBarProps): ReactElement {
  const isActive = (idx: number): string => {
    return activeIdx === idx ? "active" : "";
  };

  return (
    <div className="btm-nav">
      <button className={isActive(0)}>
        <HomeIcon />
      </button>
      <div className="flex-1 pb-5">
        <Link to={WRITE_PAGE_PATH}>
          <button className="btn btn-circle btn-primary h-16 w-16">
            <WriteIcon className="h-8 w-8" />
          </button>
        </Link>
      </div>
      <button className={isActive(2)}>
        <BookIcon />
      </button>
    </div>
  );
}
