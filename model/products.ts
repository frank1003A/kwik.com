import { ObjectId } from "mongodb";

export default class products {
    constructor(
        public readonly _id?: ObjectId,
        public description? : string,
        public type?: string,
        public rate?: string,
        public qty?: number
    ){}
}