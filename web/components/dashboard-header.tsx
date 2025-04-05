"use client";

import {  Menu,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const [ , setTheme] = useState<"light" | "dark">("dark");
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 transform -translate-x-1/2",
        "z-50 w-full max-w-3xl", // Increased max-width
        "bg-black/10 backdrop-blur-md border border-white/10",
        "rounded-xl shadow-lg transition-all duration-300",
        "py-2 px-4", // Reduced vertical padding
        isScrolled ? "py-1" : "py-2", // Adjust padding on scroll
        "flex items-center justify-between", // Changed to justify-between
        "transition-transform", // Added for smooth transition
        isScrolled ? "transform translate-y-0" : "transform translate-y-0" // Added translate-y
      )}
    >
      <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-white  flex items-center justify-center">
              {/* You can replace this with a black logo if you have one */}
              <span className="font-bold text-black">J</span>
            </div>
            <span className="font-semibold text-xl text-white">JetCal</span>
          </Link>
        </div>

      <div className="flex items-center gap-3">

        {status === "unauthenticated" ? (
          <>
            <Link href="/api/auth/signin">
              <Button variant="secondary" className="bg-white text-black hover:bg-gray-200 border-none">Log In</Button>
            </Link>
            <Link href="/api/auth/signin">
              <Button className="bg-black text-white hover:bg-gray-800 border-none">Sign Up</Button>
            </Link>
          </>
        ) : (
          <>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white">
                  {/* Bell Icon Removed */}
                  {/* <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-black border border-white/10">
                <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="max-h-80 overflow-y-auto">
                  {[].map((i) => (  // Removed the notifications
                    <DropdownMenuItem
                      key={i}
                      className="cursor-pointer py-3 hover:bg-white/10 text-white"
                    >
                      <div>
                        <p className="font-medium text-sm ">
                          New message from Acme Corp  {/* Removed the dynamic content*/}
                        </p>
                        <p className="text-xs text-gray-400">
                          2 hours ago
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="bg-white/10"/>
                <DropdownMenuItem className="cursor-pointer justify-center hover:bg-white/10 text-white">
                  <span className="  text-sm font-medium">
                    View all notifications
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>



            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <div className="h-8 w-8 rounded-full bg-white border border-white/10"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black border border-white/10 text-white">
                <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10"/>
                <DropdownMenuItem className="hover:bg-white/10 text-white">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10 text-white">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10"/>
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 hover:bg-white/10  " //  Made logout red
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
       <Button variant="ghost" size="icon" className="md:hidden text-white">
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  );
}
