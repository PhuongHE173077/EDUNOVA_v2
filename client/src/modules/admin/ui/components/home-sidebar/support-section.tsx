"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PlusIcon, CalendarPlusIcon, UserPlusIcon, BookPlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const actions = [
  {
    title: "Tạo môn học",
    url: "/manage-course?create=true",
    icon: BookPlusIcon,
  },
  {
    title: "Tạo người dùng",
    url: "/manage-user?create=true",
    icon: UserPlusIcon,
  },
  {
    title: "Tạo học kỳ",
    url: "/manager-semester?create=true",
    icon: CalendarPlusIcon,
  },
];

export const SupportSection = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground text-lg">
        Quick Actions
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {actions.map((action) => (
            <SidebarMenuItem key={action.title}>
              <SidebarMenuButton
                tooltip={action.title}
                asChild
                isActive={pathname === action.url}
              >
                <Link
                  href={action.url}
                  className="flex items-center gap-2 p-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  <action.icon className="w-4 h-4" />
                  <span>{action.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
