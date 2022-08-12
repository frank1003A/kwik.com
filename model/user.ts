import { ObjectId } from "mongodb";

export default class user {
    constructor(
        public readonly _id?: ObjectId,
        public username?: string,
        public fullname?: string,
        public email?: string,
        public password?: string,
        public phone_number?: string,
        public buisness_name?: string,
        public buisness_address?: string,
        public buisness_address2?: string,
        public buisness_logo?: string,
        public country?: string,
    ){}
}