import { Avatar } from '@/components/ui/avatar'
import { AvatarHeader } from '@/modules/student/ui/components/Avatar'
import StudentCarousel from '@/modules/student/ui/components/Carousel'
import { HomepageContent } from '@/modules/student/ui/components/Content/Content'
import React from 'react'

export default function page() {

  return (
    <div className='w-full'>
      <div className="flex flex-col items-center justify-center">
        <StudentCarousel />

      </div>


      <AvatarHeader />

      <HomepageContent />


    </div>
  )
}
