import React from 'react'
import styles from '../styles/Invoice.module.css'
import { clearSelectValue } from '../src/redux/invoiceSlice'
import {useAppDispatch, useAppSelector} from '../src/redux/hooks'

interface Props {
  options:{ value: string; text: string; }[],
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const EditableSelect = ({options, onSelectChange}: Props) => {
  const dispatch = useAppDispatch()
  const selectedCinInvoice = useAppSelector(state => state.invoice.invoice)

  const clearSelect = () => dispatch(clearSelectValue({
    invName: 'companyCountry'
  }))

  return (
    <>
    {
       selectedCinInvoice.companyCountry ? 
      <input type="text" value={selectedCinInvoice.companyCountry} onFocus={() => clearSelect()} />
      :
      <select name="countrySelector" placeholder='Select Country' className={styles.select}
      value={selectedCinInvoice.companyCountry} 
      onChange={onSelectChange}>
      {options.map((option) => (
          <option key={option.text} value={option.value}>
            {option.text}
          </option>
        ))}
    </select> 
    }
    </>
  )
}

export default EditableSelect