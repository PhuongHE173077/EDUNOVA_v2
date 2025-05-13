"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BookOpenIcon,
  UsersIcon,
  CalendarDaysIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  {
    title: "Manage Courses",
    url: "/manage-course",
    icon: BookOpenIcon,
  },
  {
    title: "Manage User",
    url: "/manage-user",
    icon: UsersIcon,
  },
  {
    title: "Manage Semester",
    url: "/manager-semester",
    icon: CalendarDaysIcon,
  },
]

export const MainSection = () => {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={pathname === item.url}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-2 p-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
