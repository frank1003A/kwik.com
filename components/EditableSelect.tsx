import React from 'react'
import styles from '../styles/Invoice.module.css'
import { Invoice } from './Data/types';

interface Props {
  options:{ value: string; text: string; }[],
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  invoice: Invoice
  customStyle?: React.CSSProperties
}

const EditableSelect = ({options, onSelectChange, invoice, customStyle}: Props) => {
  /**const dispatch = useAppDispatch() */
  
  const clearSelect = () => {
    
  }

  return (
    <>
    {
       invoice.companyCountry ? 
      <input type="text" value={invoice.companyCountry} onFocus={() => clearSelect()} style={customStyle}/>
      :
      <select name="countrySelector" placeholder='Select Country' className={styles.select}
      value={invoice.companyCountry} 
      onChange={onSelectChange}
      style={customStyle}
      >
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

/** const selectedCinInvoice = useAppSelector(state => state.invoice.invoice)

  const clearSelect = () => dispatch(clearSelectValue({
    invName: 'companyCountry'
  })) */