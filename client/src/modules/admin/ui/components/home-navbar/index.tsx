import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAppSelector } from '@/lib/redux/store'
import { selectedCurrentUser } from '@/lib/redux/user/user.slide'
import { NavUser } from '@/modules/auth/ui/components/nav-user'
import Image from 'next/image'
import Link from 'next/link'
import Notification from './notification'

export const HomeNavbar = () => {


  return (
    <nav className="flex top-0 left-0 w-full h-16 bg-white border-b items-center justify-between px-4" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <div className="flex items-center flex-shrink-0">
        <SidebarTrigger />
        <Link href='/' >
          <div className="p-4 flex items-center gap-1 cursor-auto">
            <Image
              src={"/images/logo.png"}
              width={100}
              height={20}
              alt="logo"
            />
          </div>
        </Link>


      </div>
      <div className="flex items-center gap-5 ">
        {/* <Input placeholder="Search" className="w-80" /> */}

        <Notification />

        <div className="flex-shrink-0 items-center  flex gap-4">

          <NavUser />
        </div>
      </div>

    </nav>
  )
}
