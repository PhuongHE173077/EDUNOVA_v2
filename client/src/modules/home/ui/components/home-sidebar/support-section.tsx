"use client"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { CircleHelpIcon, MessageSquareIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    title: 'Settings',
    url: "/setting",
    icon: SettingsIcon
  },
  {
    title: 'Send Feedback',
    url: "/feed/subscriptions",
    icon: MessageSquareIcon,
  },
  {
    title: 'help',
    url: "/feed/trending",
    icon: CircleHelpIcon,
  },

]
export const SupportSection = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-muted-foreground text-lg'>Support</SidebarGroupLabel>
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
