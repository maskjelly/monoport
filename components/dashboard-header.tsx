"use client";

import { Bell, HelpCircle, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/actions/auth";

export function DashboardHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { data: session, status } = useSession();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 border-b flex items-center px-6">
      <Button variant="ghost" size="icon" className="md:hidden mr-2">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="h-16 border-b flex items-center px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center"></div>
          <span className="font-semibold text-xl text-foreground">JetCal</span>
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {status === "unauthenticated" ? (
          <>
            <Link href="/api/auth/signin">
              <Button variant="secondary">Log In</Button>
            </Link>
            <Link href="/api/auth/signin">
              <Button>Sign Up</Button>
            </Link>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem
                      key={i}
                      className="cursor-pointer py-3 hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          New message from Acme Corp
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center hover:bg-blue-100 dark:hover:bg-blue-900">
                  <span className="text-primary text-sm font-medium">
                    View all notifications
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="default"
              size="icon"
              className="hover:cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <div className="h-8 w-8 rounded-full bg-muted"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-blue-100 dark:hover:bg-blue-900">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-100 dark:hover:bg-blue-900">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-700 dark:hover:bg-red-900 dark:hover:text-black hover:bg-red-200 hover:text-white"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}
