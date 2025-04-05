"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Users,
  Star,
  Zap,
  Award,
  PhoneCall,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const StarRating = () => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-6 h-6 fill-yellow-400 stroke-yellow-400/50" />
    ))}
  </div>
);
declare global {
  interface Window {
    PlayAI: any;
  }
}
const Footer = () => {
  return (
    <div className="w-full bg-black py-20 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50">
        <div
          className="absolute inset-0"
          style={{
            background:
              "url(https://images.unsplash.com/photo-1503864697563-fa515a715794?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            opacity: 0.1,
            mixBlendMode: "overlay",
            filter: "grayscale(80%)",
          }}
        ></div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-['Playfair_Display',serif]">
                JetCal
              </h3>
              <p className="text-gray-300 font-['Inter',sans-serif]">
                Business automation solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold font-['Inter',sans-serif]">
                Quick Links
              </h4>
              <ul className="space-y-2 font-['Inter',sans-serif]">
                <li>
                  <Link
                    href="/"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold font-['Inter',sans-serif]">
                Contact
              </h4>
              <p className="text-gray-300 font-['Inter',sans-serif]">
                Email: info@jetcal.com
              </p>
              <p className="text-gray-300 font-['Inter',sans-serif]">
                Phone: +123 456 7890
              </p>
              <p className="text-gray-300 font-['Inter',sans-serif]">
                Address: 123 Main St, Anytown, USA
              </p>
            </div>

            {/* Follow Us */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold font-['Inter',sans-serif]">
                Follow Us
              </h4>
              <div className="flex gap-4 font-['Inter',sans-serif]">
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Facebook
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 font-['Inter',sans-serif]">
            &copy; {new Date().getFullYear()} JetCal. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Video */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
        {/* Video Background */}
        <div className="absolute top-0 right-0 w-full h-full">
          <video
            className="object-cover h-full w-full object-right"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/herosec.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="w-full h-full bg-black"></div>
          </video>
        </div>
        {/* Gradient Blend */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-32 md:py-40 lg:py-48 min-h-[90vh] flex items-center">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="px-4 py-1.5 backdrop-blur-md bg-white/10 border border-white/10 text-white shadow-lg  mb-8 font-['Inter',sans-serif]"
              >
                {session ? "Welcome back" : "Elevate Your Business, Intelligently"}
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-8 font-['Playfair_Display',serif]  ">
                {session ? (
                  <>Hello, {session.user?.name}</>
                ) : (
                  <>
                    AI communication automation{" "}
                    <span className=" drop-shadow-lg font-['Playfair_Display',serif]">
                      So you focus on BUSINESS
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-300 max-w-xl mb-8 font-['Inter',sans-serif]">
                JetCal delivers AI communication automation and customer query reliance 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 font-['Inter',sans-serif]">
                <Link href={session ? "/dashboard" : "/api/auth/signin"}>
                  <Button
                    size="lg"
                    className={cn(
                      "w-full sm:w-auto text-lg px-8 h-16",
                      "bg-white text-black",
                      "hover:bg-gray-200  ",
                      " shadow-lg hover:shadow-xl",
                      "transition-all duration-300 transform hover:scale-105",
                      "font-semibold border-0"
                    )}
                  >
                    {session ? "Dashboard Access" : "Start Free Trial"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto text-lg px-8 h-16",
                    "bg-transparent border-white/20 text-white",
                    "hover:bg-white/10 hover:border-white/30",
                    "transition-all duration-300",
                    "font-semibold"
                  )}
                >
                  Request a Demo
                </Button>
              </div>
              <div className="pt-8 text-sm text-gray-400 font-['Inter',sans-serif]">
                No credit card required • 14-day trial included • Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32 space-y-24 md:space-y-40">
        {/* Features */}
        <div className="w-full max-w-[1400px] mx-auto space-y-16">
          <div className=" ">
            <div className="grid md:grid-cols-2 items-center gap-12">
              {/* Image */}
              <div className="w-full">
                <img
                  src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"
                  alt="AI-Powered Business Solutions"
                  className="rounded-lg shadow-2xl"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white   drop-shadow-lg font-['Playfair_Display',serif]">
                  Fast Paces AI automation for unhinged businesses focused on BUSINESS
                </h2>
                <p className="text-lg text-gray-300 font-['Inter',sans-serif]">
                  We deliver focused AI tools to transform communication,
                  streamline workflows, and better YOUR customer experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3 font-['Inter',sans-serif]">
            <Card
              className={cn(
                "backdrop-blur-md bg-black/5 border border-white/10",
                "hover:bg-gray-900/90 hover:border-white/20",
                "transition-all duration-300 transform hover:scale-[1.02]",
                "shadow-lg hover:shadow-xl"
              )}
            >
              <CardContent className="p-8 space-y-4">
                <div className="h-16 w-16 rounded-full  flex items-center justify-center shadow-md">
                  <PhoneCall className="h-8 w-8 text-white  " />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white font-['Inter',sans-serif]">
                  AI-Powered Custom Calls
                </h3>
                <p className="text-gray-300 font-['Inter',sans-serif]">
                  Smart, personalized automation for inbound and outbound calls.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  <li>Customizable call flows</li>
                  <li>Real-time data integration</li>
                  <li>24/7 availability</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "backdrop-blur-md bg-black/5 border border-white/10",
                "hover:bg-gray-900/90 hover:border-white/20",
                "transition-all duration-300 transform hover:scale-[1.02]",
                "shadow-lg hover:shadow-xl"
              )}
            >
              <CardContent className="p-8 space-y-4">
                <div className="h-16 w-16 rounded-full  flex items-center justify-center shadow-md">
                  <MessageSquare className="h-8 w-8 text-white  " />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white font-['Inter',sans-serif]">
                  WhatsApp Assistant
                </h3>
                <p className="text-gray-300 font-['Inter',sans-serif]">
                  Intelligent automation for seamless WhatsApp engagement.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  <li>Automated replies</li>
                  <li>Personalized messaging</li>
                  <li>Multi-channel integration</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "backdrop-blur-md bg-black/5 border border-white/10",
                "hover:bg-gray-900/90 hover:border-white/20",
                "transition-all duration-300 transform hover:scale-[1.02]",
                "shadow-lg hover:shadow-xl"
              )}
            >
              <CardContent className="p-8 space-y-4">
                <div className="h-16 w-16 rounded-full  flex items-center justify-center shadow-md">
                  <Calendar className="h-8 w-8 text-white  " />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white font-['Inter',sans-serif]">
                  Smart Scheduling
                </h3>
                <p className="text-gray-300 font-['Inter',sans-serif]">
                  Automated appointment management for optimized efficiency.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  <li>Automated booking</li>
                  <li>Calendar sync</li>
                  <li>Reminder notifications</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="w-full max-w-[1400px] mx-auto space-y-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16  drop-shadow-lg font-['Playfair_Display',serif]">
            What Our Users Say
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 font-['Inter',sans-serif]">
            <Card
              className={cn(
                "backdrop-blur-md bg-black/5 border border-white/10",
                "hover:bg-gray-900/90 hover:border-white/20",
                "transition-all duration-300 shadow-lg"
              )}
            >
              <CardContent className="p-8 space-y-6">
                <StarRating />
                <p className="text-gray-300 mb-6 text-lg font-['Inter',sans-serif] italic">
                  "JetCal has revolutionized our customer engagement. The
                  intelligent call automation and WhatsApp assistant have
                  significantly improved our response times."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full  border border-white/10"></div>
                  <div>
                    <p className="font-semibold text-white font-['Inter',sans-serif]">
                      Sarah Johnson
                    </p>
                    <p className="text-sm text-gray-400 font-['Inter',sans-serif]">
                      CEO, Bright Solutions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "backdrop-blur-md bg-black/5 border border-white/10",
                "hover:bg-gray-900/90 hover:border-white/20",
                "transition-all duration-300 shadow-lg"
              )}
            >
              <CardContent className="p-8 space-y-6">
                <StarRating />
                <p className="text-gray-300 mb-6 text-lg font-['Inter',sans-serif] italic">
                  "JetCal's ease of use and powerful AI are unmatched. Our team
                  loves the streamlined scheduling automation."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full   border border-white/10"></div>
                  <div>
                    <p className="font-semibold text-white font-['Inter',sans-serif]">
                      Michael Chen
                    </p>
                    <p className="text-sm text-gray-400 font-['Inter',sans-serif]">
                      Operations Director, Tech Innovate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "backdrop-blur-md bg-black/5 border border-white/10",
                "hover:bg-gray-900/90 hover:border-white/20",
                "transition-all duration-300 shadow-lg",
                "md:col-span-2 lg:col-span-1"
              )}
            >
              <CardContent className="p-8 space-y-6">
                <StarRating />
                <p className="text-gray-300 mb-6 text-lg font-['Inter',sans-serif] italic">
                  "The intelligent insights have empowered us to make data-driven
                  decisions and optimize our communication strategies."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full   border border-white/10"></div>
                  <div>
                    <p className="font-semibold text-white font-['Inter',sans-serif]">
                      Alex Rodriguez
                    </p>
                    <p className="text-sm text-gray-400 font-['Inter',sans-serif]">
                      Marketing Manager, Elevate Digital
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full">
          <Card
            className={cn(
              "max-w-[1400px] mx-auto overflow-hidden relative"
            )}
          >
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 items-center">
                {/* Video Background */}
                <div className="absolute inset-0">
                  <video
                    className="object-cover w-full h-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/mask.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                    <div
                      className="w-full h-full bg-black"
                      style={{
                        filter: "brightness(110%) contrast(90%) blur(4px)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                    ></div>
                  </video>
                  <div
                    className="absolute inset-0 "
                    style={{
                      background:
                        "url(https://images.unsplash.com/photo-1503864697563-fa515a715794?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                      backgroundSize: "cover",
                      opacity: 0.1,
                      mixBlendMode: "overlay",
                      filter: "grayscale(80%)",
                    }}
                  ></div>
                  {/* Dark gradient overlay for text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 p-8 md:p-12 lg:p-16 space-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white  drop-shadow-lg font-['Playfair_Display',serif]">
                    Ready to Transform Your Business with AI?
                  </h2>
                  <p className="text-xl text-gray-300 font-['Inter',sans-serif]">
                    Partner with JetCal to redefine communication and drive
                    unprecedented growth.
                  </p>

                  <div className="pt-6 font-['Inter',sans-serif]">
                    <Link href="/api/auth/signin">
                      <Button
                        size="lg"
                        className={cn(
                          "text-lg px-8 h-16",
                          "bg-white text-black",
                          "hover:bg-gray-200  ",
                          " shadow-xl hover:shadow-2xl",
                          "transition-all duration-300 transform hover:scale-105",
                          "font-semibold border-0"
                        )}
                      >
                        Start Your Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block h-full">
                  <div className="h-full   flex items-center justify-center">
                    <Award className="text-white/20 text-[200px] drop-shadow-2xl" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

