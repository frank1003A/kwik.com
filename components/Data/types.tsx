import { ObjectId } from "mongodb"

export interface STATUS {
  status: 'draft' | 'pending' | 'complete' 
}

export interface InvoiceItems {
  _id?: ObjectId | string
  description: string
  quantity: number
  rate: string
  amount: string
}

export interface Invoice {
  _id?: ObjectId
  logo: string
  logoWidth: number
  title: string
  companyName: string
  companyAddress: string
  companyAddress2: string
  companyCountry: string

  billTo: string
  clientName: string
  clientAddress: string
  clientAddress2: string
  clientCountry: string

  invoicedetailsheader: string
  invoiceTitleLabel: string
  invoiceTitle: string
  invoiceDateLabel: string
  invoiceDate: string
  invoiceDueDateLabel: string
  invoiceDueDate: string

  invoiceitems: InvoiceItems[]

  subTotalLabel: string
  subTotal:string
  taxLabel: string
  tax: number

  totalLabel: string
  total: string 
  currency_symbol: string
  currency: string

  notesLabel: string
  notes: string
  termLabel: string
  term: string

  status?: STATUS["status"]
}
