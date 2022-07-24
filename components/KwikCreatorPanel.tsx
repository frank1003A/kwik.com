import React, {FC} from 'react'
import styles from '../styles/Kwikeditor.module.css'

interface Props {
    isOver?: boolean,
    children: React.ReactChild
}

const KwikCreatorPanel: FC<Props> = ({isOver,children}) => {
  const className = isOver ? "highlight-region" : ""
  return (
    <div className={styles['kwikCreatorpanel']}>
      <div className={`creatorp${className}`}>
      {children}
      </div>
    </div>
  )
}

export default KwikCreatorPanel

