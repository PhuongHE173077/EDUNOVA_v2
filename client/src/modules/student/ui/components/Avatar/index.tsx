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
        src={currentUser?.avatar}
        alt="Avatar"
      />
      <div>
        <p className="text-lg md:text-[20px] font-bold font-mono">
          Welcome back, {currentUser?.displayName}
        </p>
        <p className="text-sm md:text-base">Welcome to EduNova!</p>
      </div>
    </div>
  )
}
