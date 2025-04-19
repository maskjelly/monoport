import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type ActivityItem = {
  id: number
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target: string
  timestamp: string
  type: "call" | "email" | "meeting" | "task" | "deal"
}

const activities: ActivityItem[] = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
    },
    action: "completed a call with",
    target: "Acme Corp",
    timestamp: "10 minutes ago",
    type: "call",
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      initials: "MC",
    },
    action: "closed a deal with",
    target: "TechStart Inc",
    timestamp: "1 hour ago",
    type: "deal",
  },
  {
    id: 3,
    user: {
      name: "Jessica Lee",
      initials: "JL",
    },
    action: "scheduled a meeting with",
    target: "Global Solutions",
    timestamp: "2 hours ago",
    type: "meeting",
  },
  {
    id: 4,
    user: {
      name: "David Wilson",
      initials: "DW",
    },
    action: "sent a proposal to",
    target: "Innovate Labs",
    timestamp: "3 hours ago",
    type: "email",
  },
  {
    id: 5,
    user: {
      name: "Emma Rodriguez",
      initials: "ER",
    },
    action: "completed a task for",
    target: "Bright Future Foundation",
    timestamp: "5 hours ago",
    type: "task",
  },
]

const getTypeColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "call":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "email":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "meeting":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "task":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "deal":
      return "bg-primary/10 text-primary border-primary/20"
    default:
      return "bg-muted text-muted-foreground border-muted-foreground/20"
  }
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${getTypeColor(activity.type)}`}>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
