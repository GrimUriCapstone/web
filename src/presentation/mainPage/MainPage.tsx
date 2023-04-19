import { SETTINGS_PAGE_PATH } from "@domain/constants/paths";
import { css } from "@emotion/react";
import { CogIcon, NotificationIcon } from "@presentation/common/atomics/Icons";
import { ContentPadding } from "@presentation/common/atomics/PageContent";
import { BottonNavigationBar } from "@presentation/common/components/BottomNavigationBar";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";

export function MainPage(): ReactElement {
  return (
    <>
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
          <Link to={SETTINGS_PAGE_PATH}>
            <button className="btn btn-ghost btn-circle">
              <CogIcon />
            </button>
          </Link>
        </div>
      </div>
      <ContentPadding>s</ContentPadding>
      <BottonNavigationBar activeIdx={0} />
    </>
  );
}
