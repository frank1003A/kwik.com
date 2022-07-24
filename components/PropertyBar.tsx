import React, {FC} from 'react'
import styles from '../styles/Invoice.module.css'

interface Props {
    children: JSX.Element[] | any[] | JSX.Element,
    id?: string
}

const PropertyBar:FC<Props> = ({children, id}) => {
  return (
    <div className={styles.property_bar} id={id}>
        {children}
    </div>
  )
}

export default PropertyBar

/**    position: relative;
    height: 100vh;
    display: grid;
    background: #eee;
    width: 100%;
    grid-template-columns: 18% 82%;
    grid-template-rows: 64px 100% 50px;
    justify-items: center; */