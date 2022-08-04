import React, { FC } from 'react'
import styles from '../styles/Invoice.module.css'
import { clearSelectValue } from '../src/redux/invoiceSlice'
import {useAppDispatch, useAppSelector} from '../src/redux/hooks'
import { Invoice } from './Data/types'

interface Props {
    handleDateInput: (e:React.ChangeEvent<HTMLInputElement>) => void, 
    selectedDate: string,
    dateName: keyof Invoice,
    invoice: Invoice
}

const EditableDate: FC<Props> = ({handleDateInput, selectedDate,  dateName, invoice}) => {
 /** const dispatch = useAppDispatch() */
  
  const clearDateValue = () => { }

  return (
    <div>
      {
            invoice[dateName]  ?
            <input type="text" defaultValue={invoice[dateName] as string} onFocus={() => clearDateValue()} />
            :
            <input type="date" value={invoice[dateName] as string} onChange={handleDateInput}/>
      }
    </div>
  )
}

export default EditableDate

/**const selectedCinInvoice = useAppSelector(state => state.invoice.invoice)

  const clearDateValue = () => {
    dispatch(
      clearSelectValue({
      invName: dateName
    }))
  } */