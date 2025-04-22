import React from 'react'

export const AvatarHeader = () => {
  return (
    <div className="flex items-center gap-2 mt-2 mx-4 md:ml-10">
      <img
        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
        src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
        alt="Avatar"
      />
      <div>
        <p className="text-lg md:text-[20px] font-bold font-mono">
          Welcome back, John Doe
        </p>
        <p className="text-sm md:text-base">Welcome to EduNova!</p>
      </div>
    </div>
  )
}
