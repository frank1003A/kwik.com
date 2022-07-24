import React, { FC, useEffect, useRef } from 'react'
import styles from '../../styles/Home.module.css'

interface Props {
    isOver?: boolean, 
    children?: React.ReactChild[]
}

const Creator_Panel: FC<Props> = ({isOver,children,}) => {
  const className = isOver ? "highlight-region" : ""
  
  return (
    <div className={styles['kwikCreatorpanel']} id="panel">
      <div className={`creatorp${className}`}>
      {children}
      </div>
    </div>
  )
}

export default Creator_Panel

