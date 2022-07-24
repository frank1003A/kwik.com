import React, {FC} from 'react'
import styles from '../../styles/Kwikeditor.module.css'

interface Props {
    children: JSX.Element | JSX.Element[] | any[]
}

const CreatorBox: FC<Props> = ({children}) => {
  return (
    <div className={styles["fe"]}>
            {children}
    </div>
  )
}

export default CreatorBox