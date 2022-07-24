import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId  } from 'mongodb'
import clientPromise from '../../../lib/Mongodb'
import { Invoice } from '../../../components/Data/types'

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {
   
    //GET request: http://localhost:3000/api/invoices
  if (req.method === "GET") {
    try {
      const client = await clientPromise; 
      const db = client.db("Kwik"); // connect to database 
      const Invoices = await db.collection("Invoices").find({}).toArray() as Invoice[]
      res.status(200).json(Invoices);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //POST request: http://localhost:3000/api/invoices
  if (req.method === "POST") {
    try {
        const newInvoice = req.body as Invoice //
        const client = await clientPromise
        const db = client.db("Kwik") // connect to database 
        await db.collection("Invoices").insertOne(newInvoice)
        res.status(201).json(newInvoice);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
  }

   //PUT request: http://localhost:3000/api/invoices
   if (req.method === "PUT") {
    try {
        const newInvoice = req.body as Invoice //
        const client = await clientPromise
        const db = client.db("Kwik") // connect to database 
        await db.collection("Invoices").insertOne(newInvoice)
        res.status(201).json(newInvoice);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
  }
}