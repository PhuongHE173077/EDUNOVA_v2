'use client'
import { useAppSelector } from '@/lib/redux/store'
import { selectedCurrentUser } from '@/lib/redux/user/user.slide'
import React from 'react'

export const AvatarHeader = () => {
  const currentUser = useAppSelector(selectedCurrentUser)
  return (
    <div className="flex items-center gap-2 mt-2 mx-4 md:ml-10">
      <img
        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
        src={currentUser?.avatar || 'https://imgs.search.brave.com/5Xc2dVOqg4DvXgzPf541vJ9M0oOdy7I543u_6Y9BZzM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdXNlci1jaXJj/bGUtd2l0aC1ibHVl/LWdyYWRpZW50LWNp/cmNsZV83ODM3MC00/NzI3LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDA'}
        alt="Avatar"
      />
      <div>
        <p className="text-lg md:text-[20px] font-bold font-mono">
          Xin chào, {currentUser?.displayName}
        </p>
        <p className="text-sm md:text-base">Chào mừng  </p>
      </div>
    </div>
  )
}
