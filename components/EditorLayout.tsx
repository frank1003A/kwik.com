import React, { FC } from 'react';

import styles from '../styles/Home.module.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface Props {
    children: React.ReactChild[]
}

const EditorLayout:FC<Props> = ({children}) => {
  return (
    <div>
      <Topbar/>
      <Sidebar/>
      <div className={styles['pContainer']}>
          {children}
      </div>
    </div>
  )
}

export default EditorLayout