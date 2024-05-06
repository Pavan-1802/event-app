import React from 'react'
import hero from "../public/images/hero.png"
import Link from 'next/link'
import Image from 'next/image'

function Hero() {
  return (
    <div className='h-screen bg-gray-200 text-black'>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <button className="button w-full sm:w-fit">
              <Link href="#">
                Explore Now
              </Link>
            </button>
          </div>
          <Image 
            src={hero}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> 
    </div>
  )
}

export default Hero
