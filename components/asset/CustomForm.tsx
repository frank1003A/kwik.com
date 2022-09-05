import { FormControl, FormLabel, FormGroup, StepLabel, FormHelperText } from '@mui/material'
import React, { ReactNode } from 'react'


interface Props {
    topLabel?: string,
    children?: ReactNode,
    bottomText?: string
}

const CustomForm = ({topLabel, children, bottomText}: Props) => {
  return (
    <FormControl component="fieldset">
                <FormGroup>
                  <StepLabel>{topLabel}</StepLabel>
                    {children}
                </FormGroup>
                <FormHelperText>{bottomText}</FormHelperText>
    </FormControl>
  )
}

export default CustomForm