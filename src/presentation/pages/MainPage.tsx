import { NotificationIcon } from "@presentation/atomics/Icons";
import { BottonNavigationBar } from "@presentation/components/BottomNavigationBar";
import { type ReactElement } from "react";

export function MainPage(): ReactElement {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <h1 className="btn btn-ghost text-xl normal-case">그림우리</h1>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <NotificationIcon />
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <BottonNavigationBar activeIdx={0} />
    </div>
  );
}
