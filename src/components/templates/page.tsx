import React from "react";
import { History } from "history";

import { MainNavbar, AuthNavbar } from "../../containers/nav";
import { AuthUser } from "../../models/auth";

interface TProps {
  children: React.ReactNode;
  user: AuthUser;
  avatar: any;
  wrapperClass?: string;
  dataTest?: string;
  showSearch?: boolean;
  notificationsRef?: any;
  history?: History<History.PoorMansUnknown>;
}

export const PageTemplate = ({
  wrapperClass = "container",
  dataTest,
  avatar,
  user,
  children,
  history,
  notificationsRef,
  showSearch,
}: TProps) => {
  return (
    <div className={wrapperClass} data-test={dataTest}>
      <AuthNavbar
        history={history}
        avatar={avatar}
        showSearch={showSearch}
        notificationsRef={notificationsRef}
      />

      <div className="main">
        <MainNavbar user={user} />

        {children}
      </div>
    </div>
  );
};
