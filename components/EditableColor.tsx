'use strict'

import React, {FC} from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

interface Props {
    color: string, 
    displayColorPicker: boolean, 
    handleClick: () => void, 
    handleChange: () => void, 
    handleClose: () => void 
}

const EditabeColorInput: FC<Props> = ({color, displayColorPicker, handleClick, handleChange, handleClose}) => {
  const styles = reactCSS({
    default: {
      color: {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: `${color}`,
      },
      swatch: {
        padding: "10px",
        background: "rgb(255, 255, 255)",
        borderRadius: "2px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px",
        cursor: "pointer",
        width: "220px",
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        alignItems: "center",
      },
      popover: {
        /**position: 'absolute', */
        zIndex: "2",
      },
      cover: {
        /**position: "fixed", */
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
      label: {
        color: "rgba(0, 0, 0, 0.6)",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: "400",
        fontSize: "1rem",
        lineHeight: "1.4375em",
        letterSpacing: "0.00938em",
      },
    },
  });


  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <label style={styles.label}>{color}</label>
        <div style={ styles.color } />
      </div>
      { displayColorPicker ? <div style={ styles.popover }>
        <div style={ styles.cover } onClick={ handleClose }/>
        <SketchPicker color={ color } onChange={ handleChange } />
        </div> 
      : null }
    </div>
  )
}

export default EditabeColorInput