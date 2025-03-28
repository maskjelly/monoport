"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { ArrowRight, BarChart3, CheckCircle, Users } from "lucide-react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="w-full py-4 px-6 border-b bg-white/80 backdrop-blur-sm fixed top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">CRM</span>
            </div>
            <span className="font-semibold text-xl">PrimeCRM</span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/api/auth/signin">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/api/auth/signin">
                  <Button>Sign up free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            {session ? "Welcome back" : "Streamline your client relationships"}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
            {session ? (
              <>Hello, {session.user?.name}</>
            ) : (
              <>
                The smarter way to <span className="text-primary">manage clients</span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            All-in-one CRM platform designed for small businesses to track, nurture, and grow client relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href={session ? "/dashboard" : "/api/auth/signin"}>
              <Button size="lg" className="text-lg px-8 h-14 rounded-xl">
                {session ? "Go to Dashboard" : "Start for free"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-xl">
              Book a demo
            </Button>
          </div>
          <div className="pt-8 text-sm text-slate-500">
            No credit card required • Free 14-day trial • Cancel anytime
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to manage client relationships
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform helps you track interactions, manage deals, and nurture relationships all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Client Management</h3>
              <p className="text-slate-600">
                Store all your client information in one place with custom fields and tags.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-slate-600">Get insights into your business with powerful reporting and analytics.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Task Automation</h3>
              <p className="text-slate-600">
                Automate repetitive tasks and follow-ups to save time and increase efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by businesses worldwide</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "PrimeCRM has transformed how we manage our client relationships. The interface is intuitive and the
                automation features save us hours every week."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-slate-500">CEO, Bright Solutions</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "We've tried several CRM solutions, but PrimeCRM stands out with its ease of use and powerful features.
                Our team adopted it immediately."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-slate-500">Operations Director, Tech Innovate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your client relationships?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of businesses that use PrimeCRM to grow their client base and increase revenue.
          </p>
          <Link href="/api/auth/signin">
            <Button size="lg" variant="secondary" className="text-lg px-8 h-14 rounded-xl">
              Start your free trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

