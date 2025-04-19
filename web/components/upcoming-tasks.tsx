import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Clock, Plus } from "lucide-react"

type Task = {
  id: number
  title: string
  dueDate: string
  priority: "high" | "medium" | "low"
  completed: boolean
  client?: string
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Follow up with Acme Corp about proposal",
    dueDate: "Today, 2:00 PM",
    priority: "high",
    completed: false,
    client: "Acme Corp",
  },
  {
    id: 2,
    title: "Prepare presentation for TechStart meeting",
    dueDate: "Tomorrow, 10:00 AM",
    priority: "medium",
    completed: false,
    client: "TechStart Inc",
  },
  {
    id: 3,
    title: "Review contract terms with legal team",
    dueDate: "Apr 22, 2023",
    priority: "high",
    completed: false,
  },
  {
    id: 4,
    title: "Send invoice to Global Solutions",
    dueDate: "Apr 23, 2023",
    priority: "medium",
    completed: true,
    client: "Global Solutions",
  },
  {
    id: 5,
    title: "Schedule quarterly review with Innovate Labs",
    dueDate: "Apr 25, 2023",
    priority: "low",
    completed: false,
    client: "Innovate Labs",
  },
]

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "low":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    default:
      return "bg-muted text-muted-foreground border-muted-foreground/20"
  }
}

export function UpcomingTasks() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Tasks that need your attention</CardDescription>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${task.completed ? "opacity-60 bg-muted/40" : "bg-card"}`}
            >
              <Checkbox id={`task-${task.id}`} checked={task.completed} />
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {task.title}
                </label>
                {task.client && <p className="text-xs text-muted-foreground">Client: {task.client}</p>}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {task.dueDate}
                  </div>
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
