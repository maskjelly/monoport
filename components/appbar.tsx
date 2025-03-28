"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import {
  Bell,
  HelpCircle,
  Menu,
  Search,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { signIn, signOut } from "next-auth/react";

interface AppBarProps {
  session: Session | null;
}

export default function AppBar({ session }: AppBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
      // Display error message (e.g., using a toast)
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log("Theme toggled:", theme); // Debugging line
  };

  console.log("Current theme:", theme); // Debugging line

  return (
    <header className="w-full h-16 border-b bg-white/80 dark:bg-black/80 backdrop-blur-sm fixed top-0 z-10 flex items-center px-6">
      {/* Mobile Menu Button (Hidden on larger screens) */}
      <Button variant="ghost" size="icon" className="md:hidden mr-2">
        <Menu className="h-5 w-5" />
      </Button>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center font-bold">
          ♛
        </div>

        <Link href="/">
          <span className="font-semibold text-xl">JetCal</span>
        </Link>
      </div>

      {/* Search Bar (Hidden on smaller screens) */}
      <div className="relative w-full max-w-md hidden md:flex ml-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search..." className="pl-9" />
      </div>

      {/* Right Side: Icons + Auth */}
      <div className="ml-auto flex items-center gap-3">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
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
                <DropdownMenuItem key={i} className="cursor-pointer py-3">
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      New message from Acme Corp
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center">
              <span className="text-primary text-sm font-medium">
                View all notifications
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {session ? (
          <>
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {/* Login & Signup */}
            <Button variant="ghost" onClick={() => signIn()}>
              Log in
            </Button>
            <Link href="/register">
              <Button>Sign up free</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
