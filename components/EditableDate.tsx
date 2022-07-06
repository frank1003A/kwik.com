import React, { FC } from 'react'
import styles from '../styles/Invoice.module.css'
import { clearSelectValue } from '../src/redux/invoiceSlice'
import {useAppDispatch, useAppSelector} from '../src/redux/hooks'
import { Invoice } from './Data/types'

interface Props {
    handleDateInput: (e:React.ChangeEvent<HTMLInputElement>) => void, 
    selectedDate: string,
    dateName: keyof Invoice
}

const EditableDate: FC<Props> = ({handleDateInput, selectedDate,  dateName}) => {
  const dispatch = useAppDispatch()
  const selectedCinInvoice = useAppSelector(state => state.invoice.invoice)

  const clearDateValue = () => {
    dispatch(
      clearSelectValue({
      invName: dateName
    }))
  }

  return (
    <div>
      {
            selectedCinInvoice[dateName]  ?
            <input type="text" defaultValue={selectedCinInvoice[dateName] as string} onFocus={() => clearDateValue()} />
            :
            <input type="date" value={selectedCinInvoice[dateName] as string} onChange={handleDateInput}/>
      }
    </div>
  )
}

export default EditableDate