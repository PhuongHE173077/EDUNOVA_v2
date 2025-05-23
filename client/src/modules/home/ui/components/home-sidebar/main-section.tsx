"use client"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { CalendarIcon, FileBadgeIcon, FlameIcon, HomeIcon, LibraryBigIcon, PlaySquareIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
  {
    title: 'Home',
    url: "/student",
    icon: HomeIcon
  },
  {
    title: 'Courses',
    url: "/course",
    icon: LibraryBigIcon,
    auth: true
  },
  {
    title: 'Schedule',
    url: "/schedule",
    icon: CalendarIcon,
  },
  {
    title: 'Videos Recoder',
    url: "/video-recoder",
    icon: PlaySquareIcon,
  },
  {
    title: 'Achievements',
    url: "/achievement",
    icon: FileBadgeIcon,
  },
  {
    title: 'Ranked',
    url: "/rank",
    icon: FlameIcon,
  },
]
export const MainSection = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu >
          {items.map((item) => (
            <SidebarMenuItem key={item.title} >
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={pathname === item.url}

              >
                <Link href={item.url} className='flex items-center gap-2 p-2 text-sm font-medium text-black-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors'>
                  <item.icon />
                  <span className='text-sm font-medium'>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
