import React, {FC} from 'react'
import btnStyles from '../styles/Button.module.css'
import styles from '../styles/Invoice.module.css'
import ButtonComponent from './Button'
import { Print, Save, Edit, EditAttributes, PictureAsPdf } from '@mui/icons-material'

interface Props {
    handlePrint?: () => void,
    handleSave?: () => void
}

const Editorbar: FC<Props> = ({handlePrint, handleSave}) => {
  return (
    <div className={styles.editorContainer}>
    <ButtonComponent 
    className={btnStyles.muiButtonBackground} 
    icon={<PictureAsPdf/>} 
    innerText="PRINT"
    onClick={handlePrint}
    />

    <ButtonComponent 
    className={btnStyles.muiButtonBackground} 
    icon={<Save/>} 
    innerText="SAVE"
    onClick={handleSave}
    />
    
    <ButtonComponent 
    className={btnStyles.muiButtonBackground} 
    icon={<Edit/>}  
    innerText="EDIT"
    />

    <ButtonComponent 
    className={btnStyles.muiButtonBackground} 
    icon={<EditAttributes/>} 
    innerText="COLOR SCHEME"
    />
  </div>
  )
}

export default Editorbar