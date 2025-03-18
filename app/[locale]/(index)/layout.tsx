import HeaderHomePage from "@/components/header/HeaderHomePage";
import React from "react";

// ----------------------------------------------------------------------

export interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};
export default Layout;
