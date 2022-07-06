import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import type { RootState } from './store'
import { initialInvoice } from '../../components/Data/initialData'
import { Invoice, InvoiceItems } from '../../components/Data/types'

type InvoiceState = {
  invoice: Invoice
}

type Pload = {
    invName?: keyof Invoice,
    invItemName? : keyof InvoiceItems
    invValue?: string | number | number[],
    invIndex?: number,
    invtaxrate?: number | undefined,
    invId?: string | number | string[]
}

const initialState: InvoiceState = { 
    invoice : initialInvoice
}

const invoiceSlice = createSlice({ 
    name: 'invoice', 
    initialState,
    reducers : {
        updateInvoice: (state, action: PayloadAction<Pload>) => { 
            const name = action.payload.invName
            const value = action.payload.invValue
            if (name !== "invoiceitems") {
          
                if (name === "logoWidth" && typeof value === "number")
                    state.invoice[name] = value
          
                else if (name !== "logoWidth" && name !== "tax" 
                         && typeof value === "string" && name !== undefined) {
                    state.invoice[name] = value
                } 
            }
        }, 
        clearSelectValue: (state, action: PayloadAction<Pload>) => { 
            const invName = action.payload.invName
            if (typeof invName !== "undefined" && typeof state.invoice[invName] === ("string")) 
                state.invoice[invName] = "" as never
        },
        updateInvoiceItem: (state, action: PayloadAction<Pload>) => {
            //
            const invItemName = action.payload.invItemName
            const invIndex = action.payload.invIndex
            const invValue = action.payload.invValue
            const taxRate = action.payload.invtaxrate
            const newItem = {
                ...state, invoice: {
                    ['invoiceitems']: {
                        [invIndex!]: {
                            [invItemName!]:invValue
                        }
                    }
                }
            }
            produce(state, draft => {newItem})
            //
            const quantity = state.invoice["invoiceitems"][invIndex!].quantity
            const rate = state.invoice["invoiceitems"][invIndex!].rate
            const amt = (quantity * Number(rate)) !== undefined ? (quantity * Number(rate)).toString() : "0.00";
            state.invoice["invoiceitems"][invIndex!].amount = amt
            //
            const subTotal = state.invoice.invoiceitems
                            .reduce((acc, item) => acc + Number(item.amount || 0),0)
                            .toString();
            state.invoice.subTotal = subTotal === undefined ? "0.00": subTotal ;
            //
            const tax = (taxRate! / 100) * Number(state.invoice.subTotal)
            state.invoice.tax = tax
            //
            const total = Number(state.invoice.subTotal) + Number(state.invoice.tax)
            state.invoice.total = total.toString()
        },
        updateInvoiceItemNo: (state) => {
            const newItem = {
              id: Math.random() * 100,
              description: "",
              quantity: 0,
              rate: "",
              amount: "0.00",
            };
            state.invoice.invoiceitems.push({...newItem})
        },
        deleteInvoiceItemNo: (state, action: PayloadAction<Pload>) => {
            const invId = action.payload.invId
            const item = state.invoice.invoiceitems.filter((item) =>  item.id === invId )
            state.invoice.invoiceitems = {...item}
        },
    }
})

export const { 
    updateInvoice, 
    clearSelectValue, 
    updateInvoiceItem, 
    updateInvoiceItemNo, 
    deleteInvoiceItemNo 
} = invoiceSlice.actions

export const invoice = (state: RootState) => state.invoice.invoice

export default invoiceSlice.reducer
