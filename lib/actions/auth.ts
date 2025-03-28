"use server";

import { signIn, signOut } from "@/auth/auth";
import { cookies } from "next/headers";

export const login = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
  // Clear all cookies explicitly
  cookies().delete("next-auth.session-token");
  cookies().delete("next-auth.csrf-token");
  
  // Sign out and redirect
  await signOut({ 
    redirectTo: "/",
    // Optional: additional configuration to clear everything
    clearSessionAndCookies: true 
  });
};