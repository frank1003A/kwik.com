import React, {FC} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import InvoiceMain from './InvoiceMain'

interface Props {
    children: React.ReactChild[]
}

const EditorLayout:FC<Props> = ({children}) => {
  return (
    <div>
      <Topbar/>
      <div className={styles['pContainer']}>
          {children}
      </div>
    </div>
  )
}

export default EditorLayout