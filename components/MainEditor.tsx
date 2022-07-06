import React, {FC} from 'react'
import styles from '../styles/Invoice.module.css'

interface Props {
    children: any[],
}

const MainEditor: FC<Props> = ({children}) => {
  return (
    <div className={styles.mEditor}>
        {children}
    </div>
  )
}

export default MainEditor