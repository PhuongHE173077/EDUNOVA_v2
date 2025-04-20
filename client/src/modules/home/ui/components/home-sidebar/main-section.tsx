"use client"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { FlameIcon, HomeIcon, PlaySquareIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
  {
    title: 'Home',
    url: "/",
    icon: HomeIcon
  },
  {
    title: 'Subscriptions',
    url: "/feed/subscriptions",
    icon: PlaySquareIcon,
    auth: true
  },
  {
    title: 'Trending',
    url: "/feed/trending",
    icon: FlameIcon,
  }
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
              // onClick={() => {}}
              >
                <Link href={item.url} className='flex items-center gap-2 p-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors'>
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
