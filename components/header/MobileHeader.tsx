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
  navSheet?: React.JSX.Element;
  showSheet: boolean;
  setShowSheet: (item: boolean) => void;
}

const MobileHeader: React.FC<IHeaderHomePage> = ({
  navSheet,
  showSheet,
  setShowSheet,
}) => {
  return (
    <div className="block md:hidden">
      <Sheet onOpenChange={setShowSheet} open={showSheet}>
        <SheetTrigger asChild>
          <Button variant="outline">
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
  );
};
export default MobileHeader;
