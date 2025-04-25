"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/lib/supabase/auth";
import { useRouter, usePathname } from "next/navigation";
import { toasterMessage } from "@/lib/toaster";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? "w-64" : "w-18";
  const router = useRouter();
  const pathname = usePathname()
  const isActivePDFSummarize = pathname === "/pdfsummarize";

  const handleLogOut = async () => {
    await signOut()
    toasterMessage("Logged Out", "👋");
    router.push('/')
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 950);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-catamaran)]">
      <nav className="bg-white border-b px-4 py-3 flex items-center justify-between fixed w-full top-0 z-50">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" passHref>
            <span className="text-3xl font-bold text-blue-600">
              NiceNote.ai
            </span>
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 font-[family-name:var(--font-catamaran)]"
          >
            <DropdownMenuItem className="cursor-pointer font-bold" onClick={() => handleLogOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div
        className={`fixed top-0 left-0 ${sidebarWidth} mt-16 h-[calc(100vh-4rem)] bg-gray-50 flex flex-col border-r transition-width duration-300`}
      >
        <div
          className={`flex flex-col items-end gap-2 p-4`}
        >
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            className={`border-2 bg-white cursor-pointer ${isSidebarOpen ? "w-11 p-5" : "w-10 h-10"}`}
          >
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </Button>

          <Link
            href="/pdfsummarize"
            className="w-full cursor-pointer"
          >
            <Button
             className={`cursor-pointer flex border-2 text-black bg-white hover:bg-blue-50 font-bold rounded-lg transition-all ${
              isSidebarOpen
                ? "w-full h-[44px] items-center justify-start px-4"
                : "w-10 h-10 items-center justify-center"
            } ${isActivePDFSummarize ? "border-blue-200" : "border-gray-300"}`} 
            >
              {isSidebarOpen ? (
                <>
                  <span>📄</span>
                  <span className={`ml-2 ${isActivePDFSummarize ? "text-blue-600" : "text-black"}`}>PDF & Summarize</span>
                </>
              ) : (
                "📄"
              )}
            </Button>
          </Link>

          <Link href="#" className="w-full" onClick={() => toasterMessage("This feature is under development!", "🚀")}>
            <Button
              variant="ghost"
              disabled
              className={`flex border-2 bg-white text-yellow-600 border-yellow-200 font-bold rounded-lg transition-all ${isSidebarOpen
                  ? "w-full h-[44px] items-center justify-start px-4"
                  : "w-10 h-10 items-center justify-center"
                }`}
            >
              {isSidebarOpen ? (
                <>
                  <span>📝</span>
                  <span className="ml-2">Notes from Text</span>
                </>
              ) : (
                "📝"
              )}
            </Button>
          </Link>

          <Link href="#" className="w-full" onClick={() => toasterMessage("This feature is under development!", "🚀")}>
            <Button
              variant="ghost"
              disabled
              className={`flex border-2 bg-white text-yellow-600 border-yellow-200 font-bold rounded-lg transition-all ${isSidebarOpen
                  ? "w-full h-[44px] items-center justify-start px-4"
                  : "w-10 h-10 items-center justify-center"
                }`}
            >
              {isSidebarOpen ? (
                <>
                  <span>👨🏻‍💻</span>
                  <span className="ml-2">YT Video Notes</span>
                </>
              ) : (
                "👨🏻‍💻"
              )}
            </Button>
          </Link>

          <Link href="#" className="w-full" onClick={() => toasterMessage("This feature is under development!", "🚀")}>
            <Button
              variant="ghost"
              disabled
              className={`flex border-2 bg-white text-yellow-600 border-yellow-200 font-bold rounded-lg transition-all ${isSidebarOpen
                  ? "w-full h-[44px] items-center justify-start px-4"
                  : "w-10 h-10 items-center justify-center"
                }`}
            >
              {isSidebarOpen ? (
                <>
                  <span>🌐</span>
                  <span className="ml-2">Web Article Notes</span>
                </>
              ) : (
                "🌐"
              )}
            </Button>
          </Link>
        </div>

        {/* <div className="flex-grow"></div> */}
        {/* {isSidebarOpen && (
          <div className="p-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800 font-bold">
                Premium Plans for Summarize more files and get access to priority
                support!
              </p>
            </div>
            <Button className={`w-full bg-blue-600 hover:bg-blue-700 text-yellow-400 flex items-center justify-center cursor-pointer flex-grow font-bold p-5`}>
              <Sparkles className="h-4 w-4 mr-2" />Premium Plans
            </Button>
          </div>
        )} */}
      </div>

      <main
        className={`pt-16 ${isSidebarOpen ? "ml-64" : "ml-18"
          } transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
}