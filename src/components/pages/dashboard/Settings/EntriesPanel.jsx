import React, { useState, useEffect } from 'react'
import { Sectionheading } from '@/components/ui/headings/Sectionheading';

export const EntriesPanel = ({
  heading,
  children,
}) => {
  return (
    <div className='entries-panel'>

      <Sectionheading heading={heading} />

        {children}
      
    </div>
  )
}
