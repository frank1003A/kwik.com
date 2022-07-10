import React, {FC} from 'react'
import styles from '../styles/Invoice.module.css'

interface Props {
    children: JSX.Element[] | any[] | JSX.Element
}

const PropertyBar:FC<Props> = ({children}) => {
  return (
    <div className={styles.property_bar}>
        {children}
    </div>
  )
}

export default PropertyBar