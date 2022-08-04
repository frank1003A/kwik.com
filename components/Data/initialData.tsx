import { ObjectId } from 'mongodb'
import { nanoid } from 'nanoid'
import clients from '../../model/clients'
import products from '../../model/products'
import { InvoiceItems, Invoice } from './types'

export const initialInvoiceItems: InvoiceItems = {
  _id: nanoid(5),
  description: '',
  quantity: 0,
  rate: '',
  amount: '0.00'
}

export const initialInvoice: Invoice = {
  logo: '',
  logoWidth: 100,
  title: 'INVOICE',
  companyName: '',
  companyAddress: '',
  companyAddress2: '',
  companyCountry: '',
  billTo: 'Bill To:',
  clientName: '',
  clientAddress: '',
  clientAddress2: '',
  clientCountry: '',
  invoicedetailsheader: "Invoice Details",
  invoiceTitleLabel: 'Invoice#',
  invoiceTitle: '',
  invoiceDateLabel: 'Invoice Date',
  invoiceDate: '',
  invoiceDueDateLabel: 'Due Date',
  invoiceDueDate: '',
  invoiceitems: [
    {...initialInvoiceItems}
  ],
  subTotalLabel: 'Sub Total',
  subTotal: '',
  taxLabel: 'Sale Tax (10%)',
  tax: 0,
  totalLabel: 'TOTAL',
  total: '',
  currency_symbol: '$',
  currency: '',
  notesLabel: 'Notes',
  notes: 'It was great doing business with you.',
  termLabel: 'Terms & Conditions',
  term: 'Please make the payment by the due date.',
  status: 'draft'
}

export const initialClientData: clients = {
  fullname: '',
  email: '',
  buisness: 'buisness name,  if any',
  phone: 'number',
  countryCode: '',
}

export const initialProductData: products = {
  description: '',
  rate: '',
  type: '',
  qty: 0
}
