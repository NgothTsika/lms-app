import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger
        className="md:hidden pr-4 hover:opacity-75 transition"
        aria-label="Open menu"
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
