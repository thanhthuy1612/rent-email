"use client";

import LocaleSwitcher from "@/components/locale/LocaleSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import React from "react";

// ----------------------------------------------------------------------
export interface IHeaderHomePage {
  navLanding?: React.JSX.Element;
  navSheet?: React.JSX.Element;
  colorWhite?: boolean;
  showSheet: boolean;
  setShowSheet: (item: boolean) => void;
  className: string;
}

const MobileHeader: React.FC<IHeaderHomePage> = ({
  navLanding,
  navSheet,
  colorWhite,
  showSheet,
  setShowSheet,
  className,
}) => {
  return (
    <div className={"absolute top-0 left-0 right-0 z-50 " + className}>
      <div className="block md:hidden">
        <Sheet onOpenChange={setShowSheet} open={showSheet}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {navSheet}
            <SheetFooter>
              <LocaleSwitcher colorWhite={true} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
export default MobileHeader;
