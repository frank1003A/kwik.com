import { LabelImportant, WbCloudy, WbShade, WbSunny } from '@mui/icons-material';
import { 
    Typography, 
    FormControlLabel, 
    Switch, 
    Divider, 
    FormControl, 
    FormLabel, 
    StepLabel
} from '@mui/material'
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import useGetter from '../hooks/useGetter';
import ButtonComponent from './Button';
import { Invoice } from './Data/types';
import { ControlledInput, Form, SwitchContainer } from './styled-component/Global'
import { useTheme } from 'next-themes';

interface Props {
    switchOnchangehandler?: () => void;
    taxOnChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    currentTaxRate?: number;
    handleDefaultLogo?:(value: string) => void
}
  
const Settings = ({
  switchOnchangehandler, 
  taxOnChangeHandler, 
  currentTaxRate,
  handleDefaultLogo
}: Props) => {

  /**const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext); */

  const { theme, setTheme } = useTheme()

  const fileInput = useRef<HTMLInputElement>(null)

  const handleChangeImage = () => {
    if (fileInput?.current?.files) {
      const files = fileInput.current.files

      if (files.length > 0 && typeof handleDefaultLogo === 'function') {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
          if (typeof reader.result === 'string') {
            handleDefaultLogo(reader.result)
          }
        })

        reader.readAsDataURL(files[0])
      }
    }
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {checked} = e.target
    checked === false ? setTheme("light") : setTheme("dark")
  }

  return (
    <React.Fragment>
      <Form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="initial">
            Settings 
            </Typography>
          <SwitchContainer>
            <Switch 
            checked={theme === "dark" ? true : false}
            onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => handleThemeChange(e)
            }
            />
            {theme! === 'dark' ? <WbCloudy /> : <WbSunny />}
          </SwitchContainer>
        </div>
        <Divider />
        <FormControl>
          <FormLabel>Logo</FormLabel>
          <ControlledInput type={"file"} 
          ref={fileInput}
          customHeight={'fit-content'}
          accept="image/*"
          onChange={handleChangeImage}/>
          <StepLabel>Add default logo</StepLabel>
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>Buisness Address</FormLabel>
            <ControlledInput
              type={"text"}
            />
          <StepLabel>current buisness address</StepLabel>
        </FormControl>
        <Divider />
        <div style={{display: 'flex',width: '100%',gap: '.1rem'}}>
        <ButtonComponent innerText='Save' customStyle={{width: '50px'}}/>
        <ButtonComponent innerText='Cancel'/>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default Settings
