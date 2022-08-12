import { LabelImportant, WbSunny } from '@mui/icons-material';
import { 
    Typography, 
    FormControlLabel, 
    Switch, 
    Divider, 
    FormControl, 
    FormLabel, 
    StepLabel
} from '@mui/material'
import React, { useRef } from 'react'
import ButtonComponent from './Button';
import { Invoice } from './Data/types';
import { ControlledInput, Form, SwitchContainer } from './styled-component/Global'

interface Props {
    switchOnchangehandler?: () => void;
    taxOnChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    currentTaxRate?: number;
    handleDefaultLogo?:(value: string) => void
}
  
const InvoiceSettings = ({
  switchOnchangehandler, 
  taxOnChangeHandler, 
  currentTaxRate,
  handleDefaultLogo
}: Props) => {

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
          <Switch onChange={switchOnchangehandler} />
          <WbSunny />
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
          <FormLabel>Tax percentage</FormLabel>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ControlledInput
              type={"number"}
              max={100}
              min={0}
              onChange={taxOnChangeHandler}
              style={{ width: "100px" }}
            />
            <Typography variant="body2" color="initial">
              {`Tax Rate : ${!currentTaxRate ? "0" : currentTaxRate}%`}
            </Typography>
          </div>
          <StepLabel>value between 1 and 100</StepLabel>
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

export default InvoiceSettings