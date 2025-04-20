import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import React from 'react'
import { MainSection } from './main-section'

export default function HomeSidebar() {
  return (
    <Sidebar className='mt-16 z-40 border-none' collapsible='icon'>
      <SidebarContent className='bg-background shadow-md'>
        <MainSection />
      </SidebarContent>
    </Sidebar>
  )
}
