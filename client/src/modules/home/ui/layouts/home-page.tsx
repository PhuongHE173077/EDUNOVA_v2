import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { HomeNavbar } from '../components/home-navbar'
import HomeSidebar from '../components/home-sidebar'

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div className="flex  ">
          <HomeSidebar />
          {children}
        </div>

      </div>

    </SidebarProvider>
  )
}
