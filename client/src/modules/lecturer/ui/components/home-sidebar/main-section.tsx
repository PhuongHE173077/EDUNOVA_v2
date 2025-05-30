"use client"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { BookCheckIcon, CalendarIcon, FileBadgeIcon, FlameIcon, HomeIcon, LibraryBigIcon, PlaySquareIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
  {
    title: 'Trang chủ',
    url: "/Lecturer",
    icon: HomeIcon
  },
  {
    title: 'Khoá học',
    url: "/Courses",
    icon: LibraryBigIcon,
    auth: true
  },
  {
    title: 'Lịch học',
    url: "/Schedule",
    icon: CalendarIcon,
  },
  {
    title: 'Xem lại Videos ',
    url: "/Video-recoder",
    icon: PlaySquareIcon,
  },
  {
    title: 'Điểm Số',
    url: "/Score",
    icon: BookCheckIcon,
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
