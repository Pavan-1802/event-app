import React from 'react'
import hero from "../public/images/hero.png"
import Link from 'next/link'
import Image from 'next/image'

function Hero() {
  return (
    <div className='h-full bg-gray-200 text-black'>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Discover, Connect, Experience: Your Gateway to Unforgettable Events!</h1>
            <p className="p-regular-20 md:p-regular-24">Welcome to our dynamic platform designed to connect you with a diverse array of exciting events! Explore, engage, and immerse yourself in a world of opportunities, from local gatherings to global spectacles.</p>
            {/* <button className="button w-full sm:w-fit">
              <Link href="#">
                Explore Now
              </Link>
            </button> */}
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
