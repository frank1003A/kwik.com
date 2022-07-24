import { createSlice, Draft, PayloadAction, current } from '@reduxjs/toolkit'
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
    invIndex?: number | undefined,
    invtaxrate?: number | undefined,
    invId?: string | number | string[],
    elementType?: string
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
            const ph = name as string
            if (name !== "invoiceitems" && name !== "_id") {
          
                if (name === "logoWidth" && typeof value === "number")
                    state.invoice[name] = value
          
                else if (name !== "logoWidth" && name !== "tax" 
                         && typeof value === "string" && name !== undefined) {
                    state.invoice[name] = value
                } else if (!value && name !== "logoWidth" && name !== "tax" 
                && typeof value === "string" && name !== undefined) {
                  state.invoice[name] = ph
                }
            }
        }, 
        clearSelectValue: (state, action: PayloadAction<Pload>) => { 
            const invName = action.payload.invName
            const elementType = action.payload.elementType
            if (typeof invName === "string" && elementType === "select"){ 
                state.invoice[invName] = "" as never
            }
        },
        updateInvoiceItem: (state, action: PayloadAction<Pload>) => {
          //
          const invItemName = action.payload.invItemName;
          const invIndex = action.payload.invIndex;
          const invValue = action.payload.invValue;
          const taxRate = action.payload.invtaxrate;

          const items = state.invoice.invoiceitems.map((itm, idx) => {
            if (invIndex === idx) {
              const invItems: InvoiceItems = { ...itm };

              if (
                invItemName === "_id" &&
                invItemName !== undefined && 
                typeof invValue === "number"
              ) {
                throw new Error(
                    'An attempt has been made to mutate an Id field which is not allowed'
                    )
              }
              else if (
                invItemName === "quantity" && 
                invItemName !== undefined && 
                typeof invValue === "string"
              ) {
                invItems[invItemName] = Number(invValue);
              } else if (
                invItemName == "description" &&
                typeof invValue === "string"
              ) {
                invItems[invItemName] = invValue;
              } else if (
                invItemName == "rate" &&
                typeof invValue === "string"
              ) {
                invItems[invItemName] = invValue;
              }

              if (invItems.quantity && invItems.rate) {
                invItems.amount = (invItems.quantity * Number(invItems.rate)).toString();
              }
              
              return invItems
            }
            return itm
          });
          state.invoice.invoiceitems = items;
          const subTotal = state.invoice.invoiceitems
                            .reduce((acc, item) => acc + Number(item.amount || 0),0)
                            .toString();
            state.invoice.subTotal = subTotal === undefined ? "0.00": subTotal ;
            //
            const tax = taxRate !== (undefined) ? (taxRate / 100) * Number(state.invoice.subTotal) : taxRate
            if (tax !== undefined) state.invoice.tax = tax
            //
            const total = Number(state.invoice.subTotal) + (Number(state.invoice.tax) !== 0 ? Number(state.invoice.tax) : 0)
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
            const item = state.invoice.invoiceitems.filter(itm => itm._id !== invId)
           if (invId !== undefined && typeof invId === "number") {
                state.invoice.invoiceitems = item
            } 
        },
        getTaxRate: (state, action: PayloadAction<Pload>) => {
            const taxRate = action.payload.invtaxrate
            const tax = taxRate !== undefined && typeof taxRate === "string" ? 
            (Number(taxRate) / 100) * Number(state.invoice.subTotal) : taxRate
            if (tax !== undefined && typeof tax !== "string") state.invoice.tax = Number(tax)
        }
    }
})

export const { 
    updateInvoice, 
    clearSelectValue, 
    updateInvoiceItem, 
    updateInvoiceItemNo, 
    deleteInvoiceItemNo,
    getTaxRate
} = invoiceSlice.actions

export const invoice = (state: RootState) => state.invoice.invoice

export default invoiceSlice.reducer


/**
 * if (invIndex !== undefined) {

            if (invItemName === "quantity" && invItemName !== undefined && typeof invValue=== "number" )
                state.invoice.invoiceitems[invIndex][invItemName] = invValue

            else if (invItemName == "description" && typeof invValue === "string")
                     state.invoice.invoiceitems[invIndex][invItemName] = invValue

            else if (invItemName == "rate" && typeof invValue === "string")
                     state.invoice.invoiceitems[invIndex][invItemName] = invValue

            const items = state.invoice.invoiceitems.map(itm => {
                const invItems = {...itm}
                console.log(itm)
            })
            }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * const quantity = state.invoice.invoiceitems[invIndex].quantity
            const rate = state.invoice.invoiceitems[invIndex].rate
            const amt = (quantity * Number(rate)).toString()
            state.invoice.invoiceitems[invIndex].amount = amt === undefined ? "0.00" : amt
            //
            const subTotal = state.invoice.invoiceitems
                            .reduce((acc, item) => acc + Number(item.amount || 0),0)
                            .toString();
            state.invoice.subTotal = subTotal === undefined ? "0.00": subTotal ;
            //
            const tax = taxRate !== undefined ? (taxRate / 100) * Number(state.invoice.subTotal) : 0
            state.invoice.tax = tax
            //
            const total = Number(state.invoice.subTotal) + Number(state.invoice.tax)
            state.invoice.total = total.toString() 
            
            */
