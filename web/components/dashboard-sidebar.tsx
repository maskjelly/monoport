"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Briefcase,
  Target,
  Zap,
  Bell,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

type NavItemProps = {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  hasSubMenu?: boolean
  subMenuItems?: { label: string; href: string }[]
  onToggle?: () => void
  isDisabled?: boolean
}

const NavItem = ({
  icon: Icon,
  label,
  href,
  isActive = false,
  hasSubMenu = false,
  subMenuItems = [],
  onToggle,
  isDisabled = false,
}: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative group ${isDisabled ? "opacity-50" : ""}`}>
      <Link
        href={isDisabled ? "#" : href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
        onClick={
          hasSubMenu
            ? (e) => {
                e.preventDefault()
                setIsOpen(!isOpen)
              }
            : undefined
        }
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
        {hasSubMenu && (
          <div className="ml-auto">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        )}
      </Link>

      {onToggle && (
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Switch checked={!isDisabled} onCheckedChange={onToggle}/>
        </div>
      )}

      {hasSubMenu && isOpen && (
        <div className="ml-9 mt-1 space-y-1">
          {subMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground py-1.5"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function DashboardSidebar() {
  const [disabledItems, setDisabledItems] = useState<Record<string, boolean>>({})

  const toggleNavItem = (key: string) => {
    setDisabledItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="w-64 border-r hidden md:flex flex-col h-screen">
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          <NavItem
            icon={BarChart3}
            label="Dashboard"
            href="/dashboard"
            onToggle={() => toggleNavItem("dashboard")}
            isDisabled={disabledItems["dashboard"]}
          />
          <NavItem
            icon={Users}
            label="Clients"
            href="/dashboard/clients"
            isActive={true}
            hasSubMenu={true}
            subMenuItems={[
              { label: "All Clients", href: "/dashboard/clients" },
              { label: "Active Clients", href: "/dashboard/clients/active" },
              { label: "Prospects", href: "/dashboard/clients/prospects" },
            ]}
            onToggle={() => toggleNavItem("clients")}
            isDisabled={disabledItems["clients"]}
          />
          <NavItem
            icon={Briefcase}
            label="Deals"
            href="/dashboard/deals"
            hasSubMenu={true}
            subMenuItems={[
              { label: "Pipeline", href: "/dashboard/deals/pipeline" },
              { label: "Won Deals", href: "/dashboard/deals/won" },
              { label: "Lost Deals", href: "/dashboard/deals/lost" },
            ]}
            onToggle={() => toggleNavItem("deals")}
            isDisabled={disabledItems["deals"]}
          />
          <NavItem
            icon={Calendar}
            label="Calendar"
            href="/dashboard/calendar"
            onToggle={() => toggleNavItem("calendar")}
            isDisabled={disabledItems["calendar"]}
          />
          <NavItem
            icon={MessageSquare}
            label="Messages"
            href="/dashboard/messages"
            onToggle={() => toggleNavItem("messages")}
            isDisabled={disabledItems["messages"]}
          />
          <NavItem
            icon={Target}
            label="Goals"
            href="/dashboard/goals"
            onToggle={() => toggleNavItem("goals")}
            isDisabled={disabledItems["goals"]}
          />
          <NavItem
            icon={FileText}
            label="Documents"
            href="/dashboard/documents"
            onToggle={() => toggleNavItem("documents")}
            isDisabled={disabledItems["documents"]}
          />
        </div>

        {/* Automations Section */}
        <div>
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Automations</h3>
          </div>
          <div className="space-y-1">
            <NavItem
              icon={Zap}
              label="Workflows"
              href="/dashboard/workflows"
              onToggle={() => toggleNavItem("workflows")}
              isDisabled={disabledItems["workflows"]}
            />
            <NavItem
              icon={Bell}
              label="Notifications"
              href="/dashboard/notifications"
              onToggle={() => toggleNavItem("notifications")}
              isDisabled={disabledItems["notifications"]}
            />
          </div>
        </div>

        {/* Settings Section */}
        <div>
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settings</h3>
          </div>
          <div className="space-y-1">
            <NavItem
              icon={Settings}
              label="Account Settings"
              href="/dashboard/settings"
              onToggle={() => toggleNavItem("settings")}
              isDisabled={disabledItems["settings"]}
            />
            <NavItem
              icon={HelpCircle}
              label="Help & Support"
              href="/dashboard/help"
              onToggle={() => toggleNavItem("help")}
              isDisabled={disabledItems["help"]}
            />
          </div>
        </div>
      </div>

      {/* Create New Button */}
      <div className="p-4 border-t">
        <Button className="w-full justify-start">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t flex items-center">
        <div className="h-8 w-8 rounded-full bg-muted mr-3"></div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-foreground">John Doe</p>
          <p className="text-xs text-muted-foreground truncate">john@example.com</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

