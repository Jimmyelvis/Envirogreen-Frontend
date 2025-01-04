import React from 'react'

export const Sectionheading_left_bar = ({
  heading,
  subheading,
}) => {
  return (
    <div className='sectionheading-left-bar'>
      <div className="left-bar">
        <div className="top-bar"></div>
        <div className="bottom-bar"></div>
      </div>
      <h3 className='heading-3 mainheading'>{heading}</h3>
      <p className='subheading'>{subheading}</p>
    </div>
  )
}
