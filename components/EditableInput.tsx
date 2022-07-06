import React from 'react'
import { TextField } from '@mui/material'
import styles from "../styles/Invoice.module.css";

interface Props {
    placeholder: string,
    value: string | number | readonly string[] | undefined,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    editPdf: boolean,
}

const EditableInput = ({ placeholder, value, onChange, editPdf }: Props) => {
  return (
    <>
      {editPdf ? (
        <TextField variant="standard" className={styles.view}>{value}</TextField>
      ) : (
        <input
          className={styles["input"]}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
        />
      )}
    </>
  )
}

/*
import { TextField } from '@mui/material'

{pdfViewMode ? (
        <TextField sx={'span ' + (className ? className : '')}>{value}</TextField>
      ) : (
        <input
          type="text"
          className={'input ' + (className ? className : '')}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
*/

export default EditableInput