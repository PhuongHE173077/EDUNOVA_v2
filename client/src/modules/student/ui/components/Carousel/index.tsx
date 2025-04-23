import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { CarouselData } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

export default function StudentCarousel() {
  return (
    <div className="w-full px-2 pt-10 md:px-4">
      <Carousel
        className='w-full max-w-[1000px] h-[200px] sm:h-[300px] md:h-[350px] lg:h-[300px] mx-auto overflow-hidden rounded-md'
      >
        <CarouselContent>
          {CarouselData.map((item, index) => (
            <CarouselItem key={index} className='w-full h-full flex items-center justify-center'>
              <Image
                src={item.image}
                alt={item.title}
                width={1000}
                height={400}
                className='object-cover w-full h-full rounded-md '
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" /> */}
      </Carousel>
    </div>
  )
}
