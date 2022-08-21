import { ObjectId } from "mongodb";

export interface UserInvoices {
    id?: ObjectId | string  //ref of _id field to invoices
    invoiceTitle?: string //ref - not to sure for now
}

export default class clients {
    constructor(
        public readonly _id?: ObjectId,
        public fullname?: string,
        public email?: string,
        public buisness?: string,
        public phone?: string,
        public countryCode?: string,
        public owner?: string,
    ){}
}