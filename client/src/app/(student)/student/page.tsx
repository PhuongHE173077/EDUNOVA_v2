import { Avatar } from '@/components/ui/avatar'
import { AvatarHeader } from '@/modules/student/ui/components/Avatar'
import StudentCarousel from '@/modules/student/ui/components/Carousel'

export default function page() {

  return (
    <div className='w-full '>
      <div className="flex flex-col items-center justify-center">
        <StudentCarousel />

      </div>


      <AvatarHeader />


    </div>
  )
}
