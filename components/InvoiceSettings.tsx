import { LabelImportant, WbSunny } from '@mui/icons-material';
import { 
    Typography,
    Divider, 
    FormControl, 
    FormLabel, 
    StepLabel,
} from '@mui/material'
import React, { ChangeEvent, useRef } from 'react'
import ButtonComponent from './Button';
import { Invoice } from './Data/types';
import { ControlledInput, CustomSelect, Form} from './styled-component/Global'
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
  taxOnChangeHandler, 
  currentTaxRate,
  handleCurrency,
  handleStatusChange, 
  handleCloseBtn,
  data,
}: Props) => {

  const fileInput = useRef<HTMLInputElement>(null)

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
          <FormLabel>Invoice Status <span color='green'>invoice</span></FormLabel>
          <CustomSelect
            id="CustomSelect"
            value={data.status}
            onChange={handleStatusChange}
          >
            <option value={"draft"}>draft</option>
            <option value={"pending"}>pending</option>
            <option value={"complete"}>complete</option>
          </CustomSelect>
          <StepLabel>change status</StepLabel>
        </FormControl>
          <Divider />
        <FormControl>
          <FormLabel>Currency <span color='green'>global</span></FormLabel>
          <CustomSelect 
          onChange={handleCurrency}
          value={data.currency_symbol}
          >
            {currencyList?.map(list => {
              return (
                <option value={list.symbol} key={list.symbol}>{list.name}</option>
              )
            })}
          </CustomSelect>
          <StepLabel>Add currency</StepLabel>
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>Tax percentage <span color='green'>invoice</span></FormLabel>
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