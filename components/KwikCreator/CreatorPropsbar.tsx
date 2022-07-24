import React, {FC} from 'react'
import styles from '../../styles/Kwikeditor.module.css'

interface Props {
    children: JSX.Element[] | any[]  | JSX.Element,
}

const CreatorPropsbar: FC<Props> = ({children}) => {
  return (
    <div className={styles["pb"]}>
        {children}
    </div>
  )
}

export default CreatorPropsbar

