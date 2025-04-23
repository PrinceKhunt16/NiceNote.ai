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
  Plus,
  Sparkles,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";
import { toasterMessage } from "@/lib/toaster";

interface DashboardLayoutProps {
  children: ReactNode;
}

const useCases = [
  {
    title: "Upload PDF & Summarize",
    description: "Summarize your pdf discussions and get superb notes.",
    icon: "📥",
    color: "bg-blue-100",
    launch: true,
  },
  {
    title: "Take Notes from Text",
    description: "Convert your lengthy paragraph text to easy notes.",
    icon: "📄",
    color: "bg-green-100",
    launch: false,
  },
  {
    title: "YouTube Video Notes",
    description: "Hours or Miniutes long youtube video in just few bullets.",
    icon: "📺",
    color: "bg-purple-100",
    launch: false,
  },
  {
    title: "Web Article Notes",
    description:
      "Long long articles, finds you hard to read. No worry click me.",
    icon: "✍️",
    color: "bg-orange-100",
    launch: false,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? "w-64" : "w-18";
  const router = useRouter();

  const handleLogOut = async () => {
    const data = await signOut()
    toasterMessage("Logged Out", "👋");
    router.push('/')
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
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
          className={`${isSidebarOpen ? "p-4" : "p-4"} ${isSidebarOpen ? "gap-4" : "gap-4"
            } ${isSidebarOpen
              ? "flex items-center justify-between"
              : "flex flex-col-reverse items-center"
            }`}
        >
          {isSidebarOpen ? (
            <Link
              href="/pdfsummarize"
              className={`flex items-center cursor-pointer flex-grow font-bold border-2 h-[44px] hover:bg-blue-50 rounded-lg bg-white`}
            >
              <Button variant="ghost" className="w-full justify-start cursor-pointer font-bold">
                <Plus className="w-4 mr-2" /> Generate New
              </Button>
            </Link>
          ) : (
            <Link
              href="/pdfsummarize"
              className={`flex items-center cursor-pointer w-10 h-10 border-2 rounded-md bg-white hover:bg-blue-50`}
            >
              <Button variant="ghost" className="w-full justify-center cursor-pointer">
                <Plus className="h-4 w-4" fontWeight={400} />
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            className={`border-2 cursor-pointer bg-white ${isSidebarOpen ? "w-11 p-5" : "w-10 h-10"
              }`}
          >
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </Button>
        </div>

        <div className="flex-grow"></div>
        {isSidebarOpen && (
          <div className="p-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800 font-bold">
                Upgrade now to Summarize more files and get access to priority
                support!
              </p>
            </div>
            <Button className={`w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer flex-grow font-bold p-5`}>
              <Sparkles className="h-4 w-4 mr-2" /> Upgrade Now
            </Button>
          </div>
        )}
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