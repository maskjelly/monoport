"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FaGooglePlusSquare } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Side: Monochromatic Image */}
      <div className="relative md:w-1/2 h-64 md:h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/signup.jpg"
          alt="Monochromatic Image"
          width={1200}
          height={500}
          className="object-cover grayscale opacity-80"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "} */}
        {/* Dark Overlay */}
      </div>

      {/* Right Side: Sign In Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white">Sign in</h2>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent border border-white text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border border-white text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <Button className="w-full bg-white text-black hover:bg-gray-200 transition">
              Sign in
            </Button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center justify-center w-full py-2 border rounded-md transition"
              style={{ backgroundColor: "#4285F4", color: "white" }} // Google Blue
            >
              <FaGooglePlusSquare className="mr-2 text-white" />{" "}
              {/* White Icon */}
              <span className="text-white">Sign in with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
