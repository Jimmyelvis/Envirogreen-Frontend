import React from 'react'
import { Panel } from '@/components/ui/Panel'
import Image from 'next/image'

export const InfoBadge = ({
  title,
  value,
  icon,
  children
}) => {
  return (
    <Panel
      className="info-badge-panel"
    >
        <div className="info-badge__icon">
          {
            icon && (
              <Image 
                src={icon} 
                alt={title}
                width={40}
                height={40}
                layout="responsive"
                className='info-badge'
              />
            )
          }
        </div>
        <div className="info-badge_content">
          <h3 className="heading-3 info-badge_title">{title}</h3>
          <p className="info-badge_value">{value}</p>
        </div>
    </Panel>
  )
}
