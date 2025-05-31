"use client"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { CircleHelpIcon, FileIcon, MessageSquareIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    title: 'Phản hồi',
    url: "/feedback",
    icon: MessageSquareIcon
  },
  {
    title: 'Hướng đẫn',
    url: "/guides",
    icon: FileIcon,
  },


]
export const SupportSection = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='!text-black text-lg'>Support</SidebarGroupLabel>
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
