import React from 'react'
import { Button } from '@mui/material'
import styles from '../styles/Button.module.css'

interface Props {
  innerText?: string,
  compvariant?: "text" | "contained" | "outlined" | undefined,
  className?: string,
  onClick?: () => void,
  id?: string,
  icon?: JSX.Element,
  onMouseEnter?: React.MouseEventHandler,
  customStyle?: React.CSSProperties
  btnDisabled? :boolean
}

const ButtonComponent = ({
  innerText, 
  icon, 
  compvariant, 
  className, 
  onClick, 
  id, 
  onMouseEnter, 
  customStyle,
  btnDisabled
}: Props) => {

  return (
    <div>
        <button
        id={id}
        className={!className ? styles.muiButton : 
          className !== "no_bg_btn" ? `${styles.muiButton} ${className}` : className}
        onClick={onClick}
        style={customStyle}
        disabled={!btnDisabled ? false : btnDisabled}
        onMouseEnter={onMouseEnter}
        >{icon}{innerText}</button>
    </div>
  )
}

export default ButtonComponent