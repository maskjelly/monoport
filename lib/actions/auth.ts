"use server";

import { signIn, signOut } from "@/auth/auth";
import { cookies } from "next/headers";

export const login = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
  try {
    // First, sign out
    await signOut({ redirectTo: "/" });

    // Manually clear cookies
    const cookieStore = await cookies();
    
    // Use .set() with an expired date to effectively delete cookies
    cookieStore.set("next-auth.session-token", "", { 
      expires: new Date(0),
      path: "/"
    });
    cookieStore.set("next-auth.csrf-token", "", { 
      expires: new Date(0),
      path: "/"
    });
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};