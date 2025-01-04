import React from 'react'
import { Panel } from '@/components/ui/Panel'
import House_Tree_icon from '@/components/assets/img/house-tree-icon.svg'
import Image from 'next/image'

export const Info_Panel = ({
  title,
  children,
  classname
}) => {
  return (
    <Panel
      className={`info-panel ${classname}`}
    >
      <div className="info-panel_heading">
        <Image 
          src={House_Tree_icon} 
          alt={title}
          width={40}
          height={40}
          layout="responsive"
          className='info-panel-icon'
        />
          
        <h2 className="heading-2 info-panel_title">{title}</h2>
      </div>

      {children}
    </Panel>
  )
}
