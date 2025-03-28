"use server";

import { signIn, signOut } from "@/auth/auth";
import { cookies } from "next/headers";

export const login = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
  try {
    await signOut({ redirectTo: "/" });

    const cookieStore = await cookies();
    
    cookieStore.set("__Secure-authjs.session-token", "", { 
      expires: new Date(0),
      path: "/"
    });
    cookieStore.set("authjs.session-token", "", { 
      expires: new Date(0),
      path: "/"
    });
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};