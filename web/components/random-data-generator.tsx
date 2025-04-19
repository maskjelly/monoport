"use client"

import { useEffect, useState } from "react"

// Generate random client data
export function useRandomClientData(count = 10) {
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    const industries = [
      "Technology",
      "Healthcare",
      "Finance",
      "Education",
      "Manufacturing",
      "Retail",
      "Media",
      "Consulting",
      "Real Estate",
      "Energy",
    ]

    const statuses = ["Active", "Pending", "Inactive"]

    const tags = [
      "Enterprise",
      "SMB",
      "Startup",
      "Non-profit",
      "Government",
      "International",
      "Local",
      "High Value",
      "New",
      "Long-term",
    ]

    const generateRandomClient = (id: number) => {
      const companyNames = [
        "Acme Corp",
        "TechStart Inc",
        "Global Solutions",
        "Innovate Labs",
        "Bright Future",
        "Nexus Systems",
        "Pinnacle Group",
        "Horizon Enterprises",
        "Quantum Dynamics",
        "Apex Industries",
        "Elevate Partners",
        "Synergy Tech",
        "Catalyst Ventures",
        "Momentum Brands",
        "Fusion Networks",
      ]

      const randomDate = () => {
        const start = new Date(2023, 0, 1)
        const end = new Date()
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      }

      const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
        return date.toLocaleDateString("en-US", options)
      }

      const randomValue = () => {
        return `$${(Math.floor(Math.random() * 50) + 1) * 1000}`
      }

      const randomTags = () => {
        const numTags = Math.floor(Math.random() * 3) + 1
        const selectedTags: string[] = []
        for (let i = 0; i < numTags; i++) {
          const randomTag = tags[Math.floor(Math.random() * tags.length)]
          if (!selectedTags.includes(randomTag)) {
            selectedTags.push(randomTag)
          }
        }
        return selectedTags
      }

      const randomPhoneNumber = () => {
        return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
      }

      const randomCompanyName = companyNames[Math.floor(Math.random() * companyNames.length)]
      const randomIndustry = industries[Math.floor(Math.random() * industries.length)]
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

      return {
        id: `client-${id}`,
        name: randomCompanyName,
        industry: randomIndustry,
        status: randomStatus,
        lastContact: formatDate(randomDate()),
        value: randomValue(),
        nextAction: Math.random() > 0.5 ? "Follow-up call" : "Send proposal",
        nextActionDate: formatDate(new Date(new Date().getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)),
        logo: "/placeholder.svg?height=40&width=40",
        callCount: Math.floor(Math.random() * 10),
        requestCount: Math.floor(Math.random() * 5),
        tags: randomTags(),
        phoneNumber: randomPhoneNumber(),
      }
    }

    const generatedClients = Array.from({ length: count }, (_, i) => generateRandomClient(i + 1))
    setClients(generatedClients)
  }, [count])

  return clients
}
