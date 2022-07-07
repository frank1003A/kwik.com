
export interface InvoiceItems {
    id: number
    description: string
    quantity: number
    rate: string
    amount: string
  }

export default class Itemizer {
    constructor(
        public items?: InvoiceItems[]
    ) {
        this.items = items
    }
}