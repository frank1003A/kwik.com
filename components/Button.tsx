import React from 'react'
import { Button } from '@mui/material'
import styles from '../styles/Button.module.css'

interface Props {
  innerText?: string,
  compvariant?: "text" | "contained" | "outlined" | undefined,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  id?: string,
  icon?: JSX.Element,
  onMouseEnter?: React.MouseEventHandler,
  customStyle?: React.CSSProperties
}

const ButtonComponent = ({innerText, icon, compvariant, className, onClick, id, onMouseEnter, customStyle}: Props) => {

  return (
    <div>
        <Button variant={!compvariant ? 'contained' : compvariant}
        id={id}
        className={!className ? styles.muiButton : className}
        onClick={onClick}
        sx={customStyle}
        onMouseEnter={onMouseEnter}
        >{icon}{innerText}</Button>
    </div>
  )
}

export default ButtonComponent