"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { ClientCard, ClientCardSkeleton } from "@/components/client-card"; // Import Skeleton
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LayoutGrid, List, PlusCircle, RotateCw } from "lucide-react"; // Import RotateCw
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CallsChart } from "@/components/calls-chart";
import { Card, CardContent } from "@/components/ui/card";
import { getClients } from "@/app/actions/client-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

type ClientProps = {
  id: string; // Changed id to string
  name: string;
  industry: string;
  status: string;
  lastContact: string;
  value: string;
  nextAction: string;
  nextActionDate: string;
  logo: string;
  callCount: number;
  requestCount: number;
  tags: string[];
  phoneNumber: string;
};

// Separate component for fetching and displaying clients with Suspense
const ClientsData = ({
  searchQuery,
  statusFilter,
  sortBy,
  viewMode,
  groupBy,
  onRefetch
}: {
  searchQuery: string;
  statusFilter: string;
  sortBy: string;
  viewMode: "grid" | "list";
  groupBy: string;
  onRefetch: () => void;
}) => {
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const businessEmail = useSession();

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClients(businessEmail.data?.user?.email);
      setClients(
        data.map((client) => ({
          id: client.id,
          name: client.name,
          industry: "Software (dummy)",
          status: "Active (dummy)",
          lastContact: "March 15, 2023 (dummy)",
          value: "$10,000 (dummy)",
          nextAction: "Follow-up call (dummy)",
          nextActionDate: "April 5, 2023 (dummy)",
          logo: "/placeholder.svg?height=40&width=40 (dummy)",
          callCount: Math.floor(Math.random() * 5),
          requestCount: Math.floor(Math.random() * 3),
          tags: ["Technology (dummy)", "Enterprise (dummy)"],
          phoneNumber: client.phoneNumber,
        }))
      );
    } catch (e: any) {
      setError(e.message || "Failed to fetch clients");
      console.error("Error fetching clients:", e);
    } finally {
      setLoading(false);
    }
  }, [businessEmail.data?.user?.email]);


  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter clients based on search query and status
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      client.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Sort clients
  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "value":
        return (
          Number.parseFloat(b.value.replace(/[^0-9.-]+/g, "")) -
          Number.parseFloat(a.value.replace(/[^0-9.-]+/g, ""))
        );
      case "lastContact":
        return a.lastContact.localeCompare(b.lastContact);
      case "callCount":
        return b.callCount - a.callCount;
      default:
        return 0;
    }
  });

  // Group clients if needed
  const groupedClients = () => {
    if (groupBy === "none") return { "All Clients": sortedClients };

    return sortedClients.reduce(
      (groups: Record<string, typeof clients>, client) => {
        let groupKey = "";

        switch (groupBy) {
          case "status":
            groupKey = client.status;
            break;
          case "industry":
            groupKey = client.industry;
            break;
          case "tags":
            groupKey = client.tags[0] || "No Tag";
            break;
        }

        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }

        groups[groupKey].push(client);
        return groups;
      },
      {}
    );
  };

  if (clients.length === 0 && !loading) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border">
        <div className="bg-muted inline-flex rounded-full p-3 mb-4">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2 text-foreground">
          No clients found
        </h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or filter criteria
        </p>
        <Button
          variant="outline"
          onClick={() => {
            //   setSearchQuery(""); // These states are in parent component
            //   setStatusFilter("all");
          }}
        >
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div
          className={cn(
            "space-y-4",
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          )}
        >
          {[...Array(3)].map((_, i) => (
            <ClientCardSkeleton key={i} viewMode={viewMode} />
          ))}
        </div>
      )}
      {!loading && Object.entries(groupedClients()).map(([group, clients]) => (
        <div key={group} className="space-y-4">
          {group !== "All Clients" && (
            <h3 className="text-lg font-medium text-foreground mt-6">
              {group}
            </h3>
          )}
          <div
            className={cn(
              "space-y-4",
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            )}
          >
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} viewMode={viewMode} />
            ))}
          </div>
        </div>
      ))}
      {/* Refetch button */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          onClick={() => {
            fetchClients();
            onRefetch();
          }}
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <RotateCw className="mr-2 h-4 w-4" />
              Refetch Clients
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [groupBy, setGroupBy] = useState("none");
  const [refetchKey, setRefetchKey] = useState(0);

  const handleRefetch = () => {
    setRefetchKey(prevKey => prevKey + 1);
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Dashboard Title and Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8"> {/* Added pt-8 */}
              <div>
                <h1 className="text-2xl font-bold text-foreground">Clients</h1>
                <p className="text-muted-foreground">
                  Manage and track your client relationships
                </p>
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
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
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
                        <SelectItem value="lastContact">
                          Last Contact
                        </SelectItem>
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

            {/* Client Cards with Suspense */}
            <Suspense
              fallback={
                <div
                  className={cn(
                    "space-y-4",
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  )}
                >
                  {[...Array(3)].map((_, i) => (
                    <ClientCardSkeleton key={i} viewMode={viewMode} />
                  ))}
                </div>
              }
            >
              <ClientsData
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                sortBy={sortBy}
                viewMode={viewMode}
                groupBy={groupBy}
                onRefetch={handleRefetch}
                key={refetchKey}
              />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

