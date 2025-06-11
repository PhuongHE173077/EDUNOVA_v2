"use client"

import {
    Bell,
    BookIcon,
    BookMarkedIcon,
    BookOpenCheckIcon,
    CalendarIcon,
    FolderIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    MessageSquareTextIcon,
    Receipt,
    SearchIcon,
    SettingsIcon,
    UsersIcon
} from "lucide-react"
import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboardIcon,
        },

        {
            title: "Users",
            url: "/manage-users",
            icon: UsersIcon,
        },
        {
            title: "Courses",
            url: "/manage-courses",
            icon: BookIcon,
        },
        {
            title: "Schedules",
            url: "/manage-schedules",
            icon: CalendarIcon,
        },
        {
            title: "Semesters",
            url: "/manage-semesters",
            icon: BookMarkedIcon,
        },
        {
            title: "Subject",
            url: "/manage-subjects",
            icon: BookOpenCheckIcon,
        },

    ],

    navSecondary: [
        {
            title: "Feedback",
            url: "#",
            icon: MessageSquareTextIcon,
        },
        {
            title: "Notifications",
            url: "#",
            icon: Bell,
        },

    ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="/">
                                <img src="/images/logo.png" className="h-8 w-30" />

                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <hr className="my-2 border-border" />
                <NavSecondary items={data.navSecondary} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
