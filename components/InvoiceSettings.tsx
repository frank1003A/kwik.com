import { LabelImportant, WbSunny } from '@mui/icons-material';
import { 
    Typography, 
    FormControlLabel, 
    Switch, 
    Divider, 
    FormControl, 
    FormLabel, 
    StepLabel,
} from '@mui/material'
import React, { ChangeEvent, useRef } from 'react'
import ButtonComponent from './Button';
import { Invoice } from './Data/types';
import { ControlledInput, Form, SwitchContainer } from './styled-component/Global'
import currencyList from "../components/Data/currencyList"

interface Props {
    editController?: JSX.Element;
    taxOnChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    currentTaxRate?: number;
    handleDefaultLogo?:(value: string) => void,
    handleCurrency?: (e: ChangeEvent<HTMLSelectElement>) => void,
    handleStatusChange?: (e: ChangeEvent<HTMLSelectElement>) => void,
    handleCloseBtn? : () => void,
    data: Invoice
}
  
const InvoiceSettings = ({
  editController,
  taxOnChangeHandler, 
  currentTaxRate,
  handleDefaultLogo,
  handleCurrency,
  handleStatusChange, 
  handleCloseBtn,
  data,
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
            Invoice Settings
            </Typography>
        </div>
        <Divider/>
        <FormControl>
          <FormLabel>Invoice Status</FormLabel>
          <select
            style={{ padding: "0px 8px" }}
            id="select"
            value={data.status}
            onChange={handleStatusChange}
          >
            <option value={"draft"}>draft</option>
            <option value={"pending"}>pending</option>
            <option value={"complete"}>complete</option>
          </select>
          <StepLabel>change status</StepLabel>
        </FormControl>
          <Divider />
        <FormControl>
          <FormLabel>Currency</FormLabel>
          <select 
          onChange={handleCurrency}
          value={data.currency}
          >
            {currencyList?.map(list => {
              return (
                <option value={list.name}>{list.name}</option>
              )
            })}
          </select>
          <StepLabel>Add currency</StepLabel>
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
        <ButtonComponent innerText='Continue' onClick={handleCloseBtn} customStyle={{width: '100%'}}/>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default InvoiceSettings