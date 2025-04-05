"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the calls graph
const chartData = [
  { date: "2024-04-01", incoming: 4, missed: 1 },
  { date: "2024-04-02", incoming: 3, missed: 0 },
  { date: "2024-04-03", incoming: 5, missed: 2 },
  { date: "2024-04-04", incoming: 7, missed: 1 },
  { date: "2024-04-05", incoming: 6, missed: 0 },
  { date: "2024-04-06", incoming: 4, missed: 1 },
  { date: "2024-04-07", incoming: 3, missed: 0 },
  { date: "2024-04-08", incoming: 8, missed: 2 },
  { date: "2024-04-09", incoming: 9, missed: 1 },
  { date: "2024-04-10", incoming: 7, missed: 0 },
  { date: "2024-04-11", incoming: 5, missed: 1 },
  { date: "2024-04-12", incoming: 6, missed: 2 },
  { date: "2024-04-13", incoming: 8, missed: 1 },
  { date: "2024-04-14", incoming: 10, missed: 2 },
  { date: "2024-04-15", incoming: 12, missed: 3 },
  { date: "2024-04-16", incoming: 9, missed: 1 },
  { date: "2024-04-17", incoming: 11, missed: 2 },
  { date: "2024-04-18", incoming: 14, missed: 3 },
  { date: "2024-04-19", incoming: 10, missed: 1 },
  { date: "2024-04-20", incoming: 8, missed: 2 },
  { date: "2024-04-21", incoming: 7, missed: 1 },
  { date: "2024-04-22", incoming: 9, missed: 2 },
  { date: "2024-04-23", incoming: 12, missed: 3 },
  { date: "2024-04-24", incoming: 15, missed: 2 },
  { date: "2024-04-25", incoming: 11, missed: 1 },
  { date: "2024-04-26", incoming: 9, missed: 2 },
  { date: "2024-04-27", incoming: 13, missed: 3 },
  { date: "2024-04-28", incoming: 10, missed: 1 },
  { date: "2024-04-29", incoming: 12, missed: 2 },
  { date: "2024-04-30", incoming: 14, missed: 3 },
]

const chartConfig = {
  calls: {
    label: "Call Volume",
  },
  incoming: {
    label: "Incoming Calls",
    color: "hsl(var(--chart-1))",
  },
  missed: {
    label: "Missed Calls",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function CallsChart() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("incoming")

  const total = React.useMemo(
    () => ({
      incoming: chartData.reduce((acc, curr) => acc + curr.incoming, 0),
      missed: chartData.reduce((acc, curr) => acc + curr.missed, 0),
    }),
    [],
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Customer Call Activity</CardTitle>
          <CardDescription>Showing call volume for the last 30 days</CardDescription>
        </div>
        <div className="flex">
          {["incoming", "missed"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="calls"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

