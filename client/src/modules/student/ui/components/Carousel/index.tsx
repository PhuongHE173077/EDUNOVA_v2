import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { CarouselData } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

export default function StudentCarousel() {
  return (
    <Carousel
      className='lg:w-[1000px]  lg:h-[400px] sm:h-[200px] flex items-center justify-center'

    >
      <CarouselContent>
        {CarouselData.map((item, index) => (
          <CarouselItem key={index} className='w-full h-full flex items-center justify-center'>
            <Image
              src={item.image}
              alt={item.title}
              width={1000}
              height={200}
              className='object-cover w-full h-full'
            />

          </CarouselItem>
        ))}

      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />

    </Carousel>
  )
}
