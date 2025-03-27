"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Continue with your Google account
          </p>
        </div>
        <div className="mt-8">
          <Button 
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Image 
              src="/google-icon.svg" 
              alt="Google logo" 
              width={24} 
              height={24} 
            />
            <span>Sign in with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}