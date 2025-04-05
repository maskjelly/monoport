// Client Card Component (client-card.tsx)
import { useState, useEffect } from "react"; // Import useEffect
import { MoreHorizontal, Phone, Mail, Calendar, ArrowUpRight, CheckCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export type ClientProps = {
  id: string;
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

// Sample call transcriptions
const sampleTranscriptions = [
  {
    id: 1,
    date: "March 15, 2023",
    duration: "12:34",
    summary: "Client discussed new project requirements and timeline adjustments.",
    transcript:
      "Client: Hi, I'm calling about our upcoming project.\nAgent: Hello! Yes, I have your file open. How can I help?\nClient: We need to adjust the timeline a bit...",
  },
  {
    id: 2,
    date: "March 10, 2023",
    duration: "8:22",
    summary: "Follow-up call regarding invoice payment and service satisfaction.",
    transcript:
      "Agent: Good morning, I'm calling to follow up on the invoice we sent last week.\nClient: Yes, we've processed that payment yesterday...",
  },
  {
    id: 3,
    date: "February 28, 2023",
    duration: "15:47",
    summary: "Initial consultation about service options and pricing structure.",
    transcript:
      "Client: I'm interested in learning more about your premium tier.\nAgent: I'd be happy to explain our different service levels...",
  },
];

// Sample client requests
const sampleRequests = [
  {
    id: 1,
    title: "Additional user licenses",
    status: "Pending",
    date: "March 18, 2023",
    description: "Client requested 5 additional user licenses for their team expansion next month.",
  },
  {
    id: 2,
    title: "Custom reporting dashboard",
    status: "In Progress",
    date: "March 5, 2023",
    description: "Development of a custom analytics dashboard showing regional sales performance.",
  },
  {
    id: 3,
    title: "API integration support",
    status: "Completed",
    date: "February 20, 2023",
    description: "Technical assistance with integrating our API into their existing CRM system.",
  },
];

export function ClientCard({ client, viewMode = "grid" }: { client: ClientProps; viewMode?: "grid" | "list" }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "inactive":
        return "bg-muted text-muted-foreground border-muted-foreground/20";
      default:
        return "bg-muted text-muted-foreground border-muted-foreground/20";
    }
  };

  if (isDisabled) {
    return null;
  }

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex items-center p-4">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden mr-4">
            <img src={client.logo || "/placeholder.svg"} alt={client.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="font-semibold text-foreground truncate">{client.name}</h3>
              <Badge className={`ml-2 ${getStatusColor(client.status)}`}>{client.status}</Badge>
              {client.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="ml-2 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {client.industry} • {client.value}
            </p>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <div className="text-right mr-4">
              <div className="text-sm font-medium text-foreground">Next: {client.nextAction}</div>
              <div className="text-xs text-muted-foreground">{client.nextActionDate}</div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Headphones className="mr-2 h-3.5 w-3.5" />
                  Calls ({client.callCount})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Call History - {client.name}</DialogTitle>
                  <DialogDescription>View call transcriptions and summaries</DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto">
                  {sampleTranscriptions.map((call) => (
                    <div key={call.id} className="mb-4 p-4 rounded-lg bg-card border">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium text-foreground">{call.date}</div>
                        <div className="text-muted-foreground">{call.duration}</div>
                      </div>
                      <div className="text-foreground mb-2">{call.summary}</div>
                      <div className="mt-2 p-3 bg-muted rounded-md text-sm text-muted-foreground font-mono whitespace-pre-line">
                        {call.transcript}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <CheckCircle className="mr-2 h-3.5 w-3.5" />
                  Requests ({client.requestCount})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Client Requests - {client.name}</DialogTitle>
                  <DialogDescription>Track and manage client requests</DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto">
                  {sampleRequests.map((request) => (
                    <div key={request.id} className="mb-4 p-4 rounded-lg bg-card border">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium text-foreground">{request.title}</div>
                        <Badge
                          className={
                            request.status === "Completed"
                              ? "bg-primary/10 text-primary"
                              : request.status === "In Progress"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-muted text-muted-foreground"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{request.date}</div>
                      <div className="text-foreground">{request.description}</div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="default" size="sm">
              <ArrowUpRight className="mr-2 h-3.5 w-3.5" />
              View
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Client</DropdownMenuItem>
                <DropdownMenuItem>Contact History</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={!isDisabled} onCheckedChange={(checked) => setIsDisabled(!checked)}>
                  Enable Card
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete Client</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <img src={client.logo || "/placeholder.svg"} alt={client.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{client.name}</h3>
            <p className="text-sm text-muted-foreground">{client.industry}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Client</DropdownMenuItem>
              <DropdownMenuItem>Contact History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={!isDisabled} onCheckedChange={(checked) => setIsDisabled(!checked)}>
                Enable Card
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete Client</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Deal Value</span>
            <span className="font-medium text-foreground">{client.value}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Last Contact</span>
            <span className="text-sm text-foreground">{client.lastContact}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {client.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="pt-2">
            <div className="text-sm text-muted-foreground mb-1">Next Action</div>
            <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
              <Calendar className="h-4 w-4 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground">{client.nextAction}</p>
                <p className="text-xs text-muted-foreground">{client.nextActionDate}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        <div className="flex justify-between gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="mr-2 h-3.5 w-3.5" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="mr-2 h-3.5 w-3.5" />
            Email
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            <ArrowUpRight className="mr-2 h-3.5 w-3.5" />
            View
          </Button>
        </div>

        <div className="flex justify-between gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Headphones className="mr-2 h-3.5 w-3.5" />
                Calls ({client.callCount})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Call History - {client.name}</DialogTitle>
                <DialogDescription>View call transcriptions and summaries</DialogDescription>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto">
                {sampleTranscriptions.map((call) => (
                  <div key={call.id} className="mb-4 p-4 rounded-lg bg-card border">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium text-foreground">{call.date}</div>
                      <div className="text-muted-foreground">{call.duration}</div>
                    </div>
                    <div className="text-foreground mb-2">{call.summary}</div>
                    <div className="mt-2 p-3 bg-muted rounded-md text-sm text-muted-foreground font-mono whitespace-pre-line">
                      {call.transcript}
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <CheckCircle className="mr-2 h-3.5 w-3.5" />
                Requests ({client.requestCount})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Client Requests - {client.name}</DialogTitle>
                <DialogDescription>Track and manage client requests</DialogDescription>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto">
                {sampleRequests.map((request) => (
                  <div key={request.id} className="mb-4 p-4 rounded-lg bg-card border">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium text-foreground">{request.title}</div>
                      <Badge
                        className={
                          request.status === "Completed"
                            ? "bg-primary/10 text-primary"
                            : request.status === "In Progress"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-muted text-muted-foreground"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{request.date}</div>
                    <div className="text-foreground">{request.description}</div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}

export const ClientCardSkeleton = ({ viewMode }: { viewMode: "grid" | "list" }) => {
    return (
        <Card className="animate-pulse">
            <CardContent className={cn(
                "p-4 space-y-4",
                viewMode === "list" && "flex items-center gap-4"
            )}>
                {viewMode === "grid" ? (
                    <>
                        <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-full mx-auto" />
                            <Skeleton className="h-4 w-3/4 mx-auto" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                        </div>
                    </>
                ) : (
                    <>
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-3 flex-1">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

