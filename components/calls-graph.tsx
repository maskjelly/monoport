"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Sample data for the calls graph
const callData = [
  { date: "03/01", incomingCalls: 4, missedCalls: 1, callbackRequests: 2 },
  { date: "03/02", incomingCalls: 3, missedCalls: 0, callbackRequests: 1 },
  { date: "03/03", incomingCalls: 5, missedCalls: 2, callbackRequests: 3 },
  { date: "03/04", incomingCalls: 7, missedCalls: 1, callbackRequests: 2 },
  { date: "03/05", incomingCalls: 6, missedCalls: 0, callbackRequests: 1 },
  { date: "03/06", incomingCalls: 4, missedCalls: 1, callbackRequests: 0 },
  { date: "03/07", incomingCalls: 3, missedCalls: 0, callbackRequests: 1 },
  { date: "03/08", incomingCalls: 8, missedCalls: 2, callbackRequests: 3 },
  { date: "03/09", incomingCalls: 9, missedCalls: 1, callbackRequests: 4 },
  { date: "03/10", incomingCalls: 7, missedCalls: 0, callbackRequests: 2 },
  { date: "03/11", incomingCalls: 5, missedCalls: 1, callbackRequests: 1 },
  { date: "03/12", incomingCalls: 6, missedCalls: 2, callbackRequests: 3 },
  { date: "03/13", incomingCalls: 8, missedCalls: 1, callbackRequests: 2 },
  { date: "03/14", incomingCalls: 10, missedCalls: 2, callbackRequests: 4 },
]

export function CallsGraph() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-[#d3e0ea] shadow-md">
          <p className="font-medium text-[#2c3e50]">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={callData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d3e0ea" />
          <XAxis dataKey="date" stroke="#5d7793" />
          <YAxis stroke="#5d7793" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="incomingCalls"
            name="Incoming Calls"
            stroke="#4a6fa5"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="missedCalls" name="Missed Calls" stroke="#e67e22" strokeWidth={2} />
          <Line type="monotone" dataKey="callbackRequests" name="Callback Requests" stroke="#27ae60" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

