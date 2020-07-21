import React from "react";
import { History } from "history";

import { MainNavbar, AuthNavbar } from "../../containers";

interface TProps {
  children: React.ReactNode;
  wrapperClass?: string;
  dataTest?: string;
  showSearch?: boolean;
  notificationsRef?: any;
  history?: History<History.PoorMansUnknown>;
}

export const PageTemplate = ({
  wrapperClass = "container",
  dataTest,
  children,
  history,
  notificationsRef,
  showSearch,
}: TProps) => {
  return (
    <div className={wrapperClass} data-test={dataTest}>
      <AuthNavbar
        history={history}
        showSearch={showSearch}
        notificationsRef={notificationsRef}
      />

      <div className="main">
        <MainNavbar />

        {children}
      </div>
    </div>
  );
};
