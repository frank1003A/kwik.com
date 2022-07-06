import { InvoiceItems, Invoice } from './types'

export const initialInvoiceItems: InvoiceItems = {
  id: Math.random() * 100,
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
}
