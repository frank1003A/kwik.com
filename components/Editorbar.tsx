import React, {FC, ReactNode} from 'react'
import btnStyles from '../styles/Button.module.css'
import styles from '../styles/Invoice.module.css'
import ButtonComponent from './Button'
import { Print, Save, Edit, EditAttributes, PictureAsPdf } from '@mui/icons-material'
import { Checkbox, FormControlLabel } from '@mui/material'

interface Props {
    handlePrint?: () => void,
    handleSave?: () => void,
    saveText?: string,
    status?: ReactNode
}

const Editorbar: FC<Props> = ({handlePrint, handleSave, saveText, status}) => {
  return (
    <div className={styles.editorContainer}>
      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<PictureAsPdf />}
        innerText="PRINT"
        onClick={handlePrint}
      />

      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<Save />}
        innerText={saveText}
        onClick={handleSave}
      />

      <ButtonComponent
        className={btnStyles.muiButtonBackground}
        icon={<EditAttributes />}
        innerText="COLOR SCHEME"
      />

      <FormControlLabel
        label={`EDIT`}
        sx={{
          margin: "0",
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          fontWeight: "500",
          textTransform: "capitalize",
          color: "#555",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          letterSpacing: "0.00938em",
        }}
        labelPlacement="end"
        control={<Checkbox value="" color="primary" />}
      />

      <div>
        <span>{status}</span>
      </div>
    </div>
  );
}

export default Editorbar