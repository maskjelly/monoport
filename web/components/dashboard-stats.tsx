import { BarChart3, TrendingUp, Users, DollarSign, Calendar, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1 text-primary" />
            <span className="text-primary font-medium">+12%</span>
            <span className="ml-1">from last month</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1 text-primary" />
            <span className="text-primary font-medium">+5%</span>
            <span className="ml-1">from last month</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Revenue (YTD)</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1.2M</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1 text-primary" />
            <span className="text-primary font-medium">+18%</span>
            <span className="ml-1">from last year</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <Button variant="link" className="p-0 h-auto text-xs flex items-center mt-1 text-primary">
            View Calendar
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
