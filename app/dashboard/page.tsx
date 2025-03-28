"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ClientCard } from "@/components/client-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, LayoutGrid, List } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CallsChart } from "@/components/calls-chart"
import { Card, CardContent } from "@/components/ui/card"

// Sample client data
const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Technology",
    status: "Active",
    lastContact: "2 days ago",
    value: "$12,500",
    nextAction: "Follow-up call",
    nextActionDate: "Tomorrow, 2:00 PM",
    logo: "/placeholder.svg?height=40&width=40",
    callCount: 12,
    requestCount: 3,
    tags: ["VIP", "Renewal"],
  },
  {
    id: 2,
    name: "Global Industries",
    industry: "Manufacturing",
    status: "Pending",
    lastContact: "1 week ago",
    value: "$8,750",
    nextAction: "Send proposal",
    nextActionDate: "Friday, 10:00 AM",
    logo: "/placeholder.svg?height=40&width=40",
    callCount: 5,
    requestCount: 2,
    tags: ["New"],
  },
  {
    id: 3,
    name: "Bright Solutions",
    industry: "Consulting",
    status: "Active",
    lastContact: "Yesterday",
    value: "$15,200",
    nextAction: "Contract review",
    nextActionDate: "Today, 4:30 PM",
    logo: "/placeholder.svg?height=40&width=40",
    callCount: 8,
    requestCount: 4,
    tags: ["Priority"],
  },
  {
    id: 4,
    name: "Tech Innovate",
    industry: "Technology",
    status: "Inactive",
    lastContact: "3 weeks ago",
    value: "$5,000",
    nextAction: "Reengagement email",
    nextActionDate: "Next Monday",
    logo: "/placeholder.svg?height=40&width=40",
    callCount: 2,
    requestCount: 1,
    tags: ["Inactive"],
  },
  {
    id: 5,
    name: "Summit Partners",
    industry: "Finance",
    status: "Active",
    lastContact: "4 days ago",
    value: "$22,800",
    nextAction: "Quarterly review",
    nextActionDate: "Next Wednesday, 11:00 AM",
    logo: "/placeholder.svg?height=40&width=40",
    callCount: 15,
    requestCount: 6,
    tags: ["VIP", "Growth"],
  },
  {
    id: 6,
    name: "Green Earth Co.",
    industry: "Environmental",
    status: "Active",
    lastContact: "Today",
    value: "$9,300",
    nextAction: "Project kickoff",
    nextActionDate: "Thursday, 9:00 AM",
    logo: "/placeholder.svg?height=40&width=40",
    callCount: 7,
    requestCount: 2,
    tags: ["New", "Priority"],
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [groupBy, setGroupBy] = useState("none")

  // Filter clients based on search query and status
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Sort clients
  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "value":
        return (
          Number.parseFloat(b.value.replace(/[^0-9.-]+/g, "")) - Number.parseFloat(a.value.replace(/[^0-9.-]+/g, ""))
        )
      case "lastContact":
        return a.lastContact.localeCompare(b.lastContact)
      case "callCount":
        return b.callCount - a.callCount
      default:
        return 0
    }
  })

  // Group clients if needed
  const groupedClients = () => {
    if (groupBy === "none") return { "All Clients": sortedClients }

    return sortedClients.reduce((groups: Record<string, typeof clients>, client) => {
      let groupKey = ""

      switch (groupBy) {
        case "status":
          groupKey = client.status
          break
        case "industry":
          groupKey = client.industry
          break
        case "tags":
          // For simplicity, we'll just use the first tag
          groupKey = client.tags[0] || "No Tag"
          break
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }

      groups[groupKey].push(client)
      return groups
    }, {})
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Calls Graph */}
            <CallsChart />

            {/* Dashboard Title and Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Clients</h1>
                <p className="text-muted-foreground">Manage and track your client relationships</p>
              </div>
              <Button className="md:w-auto w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search clients..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="value">Value</SelectItem>
                        <SelectItem value="lastContact">Last Contact</SelectItem>
                        <SelectItem value="callCount">Call Count</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={groupBy} onValueChange={setGroupBy}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Group by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Grouping</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                        <SelectItem value="industry">Industry</SelectItem>
                        <SelectItem value="tags">Tags</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex rounded-md overflow-hidden border">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Cards */}
            {Object.entries(groupedClients()).map(([group, clients]) => (
              <div key={group} className="space-y-4">
                {group !== "All Clients" && <h3 className="text-lg font-medium text-foreground mt-6">{group}</h3>}
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                >
                  {clients.map((client) => (
                    <ClientCard key={client.id} client={client} viewMode={viewMode} />
                  ))}
                </div>
              </div>
            ))}

            {filteredClients.length === 0 && (
              <div className="text-center py-12 bg-card rounded-lg border">
                <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-foreground">No clients found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

