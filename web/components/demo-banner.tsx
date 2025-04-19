"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 80 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Auto-minimize after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimized(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
    e.preventDefault()
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed z-50 shadow-lg transition-all duration-300 cursor-move",
        isMinimized ? "w-12 h-12 rounded-full" : "max-w-md rounded-xl",
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: "linear-gradient(135deg, rgba(255,0,128,0.9), rgba(128,0,255,0.9))",
      }}
      onMouseDown={handleMouseDown}
    >
      {isMinimized ? (
        <div
          className="w-full h-full flex items-center justify-center text-white"
          onClick={() => setIsMinimized(false)}
        >
          <AlertCircle className="h-6 w-6" />
        </div>
      ) : (
        <div className="p-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-bold">Demo Mode Active</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsMinimized(true)} className="p-1 hover:bg-white/20 rounded-full">
                <span className="sr-only">Minimize</span>
                <span aria-hidden="true">−</span>
              </button>
              <button onClick={() => setIsVisible(false)} className="p-1 hover:bg-white/20 rounded-full">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-sm">
            All data displayed is for demonstration purposes only. No real client information is being shown.
          </p>
        </div>
      )}
    </div>
  )
}
