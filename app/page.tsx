"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to Your App {session?.user?.name}
        </h1>
        <p className="text-xl text-gray-600">
          Discover amazing features and start your journey
        </p>
        <Link href="/api/auth/signin">
          <Button size="lg" className="text-lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
