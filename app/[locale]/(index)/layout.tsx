import HeaderHomePage from "@/components/header/HeaderHomePage";
import React from "react";

// ----------------------------------------------------------------------

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <HeaderHomePage />
      <div className="flex-1">{children}</div>
    </div>
  );
};
export default Layout;
