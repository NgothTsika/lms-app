"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Role } from "@/lib/roles";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Avatar from "./ui/Avatar";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  // ✅ Use enum for type safety
  const isTeacher = session?.user?.role === Role.TEACHER;
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-2 ml-auto items-center">
        {(isTeacherPage || isCoursePage) && (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        )}

        {isTeacher && !isTeacherPage && (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        )}

        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full overflow-hidden border border-yellow-500">
                <Avatar src={session.user.image || undefined} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                disabled
                className="text-sm text-muted-foreground truncate"
              >
                {session.user.email}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};
