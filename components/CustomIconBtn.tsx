import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

interface Props {
    icon: JSX.Element, 
    toolTip: string,
    handleClick: () => void
}
const CustomIconBtn = ({icon, toolTip, handleClick}: Props) => {
  return (
    <Tooltip title={toolTip} onClick={handleClick}>
        <IconButton>
            {icon}
        </IconButton>
    </Tooltip>
  )
}

export default CustomIconBtn