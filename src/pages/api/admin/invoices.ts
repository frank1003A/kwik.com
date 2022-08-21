import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId  } from 'mongodb'
import clientPromise from '../../../../lib/Mongodb'
import { Invoice } from '../../../../components/Data/types'

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

   //PATCH request: http://localhost:3000/api/invoices
   if (req.method === "PATCH") {
    try {
      const query = req.query.invoice_id 
      const updatedInvoice = req.body as Invoice
      const client = await clientPromise;
      const db = client.db("Kwik");
      const Invoice = await db.collection("Invoices").updateOne(
        {_id: new ObjectId(query.toString())}, {$set: updatedInvoice})
      !Invoice ? res.status(404).json({'error': 'Error finding Id'}) : 
      res.status(200).json(Invoice);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      console.log(err.message)
    }
  }

  if (req.method === "DELETE") {
    try {
      const query = req.query.invoice_id
      const client = await clientPromise;
      const db = client.db("Kwik");
      let deletedInvoice = await db.collection("Invoices").deleteOne({_id : new  ObjectId(query.toString())})
      res.status(200).json(deletedInvoice);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
      console.log(err)
    }
  }
}