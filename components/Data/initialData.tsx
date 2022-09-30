import { nanoid } from 'nanoid';

import clients from '../../model/clients';
import products from '../../model/products';
import user from '../../model/user';
import { Invoice, InvoiceItems } from './types';

export const initialInvoiceItems: InvoiceItems = {
  _id: nanoid(5),
  description: '',
  quantity: 0,
  rate: '',
  amount: '0.00',
  editable: false
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
  invoiceDate: new Date(),
  invoiceDueDateLabel: 'Due Date',
  invoiceDueDate: new Date(),
  invoiceitems: [
    {...initialInvoiceItems}
  ],
  subTotalLabel: 'Sub Total',
  subTotal: '',
  taxLabel: 'Sale Tax',
  tax: 0,
  totalLabel: 'TOTAL',
  total: '',
  currency_symbol: '$',
  notesLabel: 'Notes',
  notes: 'It was great doing business with you.',
  termLabel: 'Terms & Conditions',
  term: 'Please make the payment by the due date.',
  status: 'draft',
  pageStyles: {
    background: "#FFFFF",
  },
  styles: {
    fontFamily: "Roboto",
    color: "#555",
  },
  colorTheme: "#2124b1"
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

export const initialUserData: user = {
  username: "",
  email: "",
  password: "",
  phone_number: "",
  buisness_name: "",
  buisness_address: "",
  buisness_address2: "",
  buisness_logo: "",
  country: ""
}
