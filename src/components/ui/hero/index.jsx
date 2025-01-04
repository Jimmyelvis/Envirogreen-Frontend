import React from 'react'
import Image from 'next/image'

export const Hero = ({
  heading, subHeading, img, children, classes
}) => {
  return (
    <div className={`hero ${classes}`}>
      <div className='hero_content'>
        <h1 className='heading-1'>{heading}</h1>
        <p className='hero_sub-heading'>{subHeading}</p>
      {children}
      </div>
      <div className="overlay"></div>
      <div className='hero_img'>
        <Image src={img} alt='' width={600} height={400} layout='responsive' />
      </div>
    </div>
  )
}
