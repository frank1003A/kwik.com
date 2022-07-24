// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId  } from 'mongodb'
import clientPromise from '../../../lib/Mongodb'
import { Invoice } from '../../../components/Data/types'

export default async function (req: NextApiRequest,res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const query = req.query.invoice_id 
      console.log(query)
      const client = await clientPromise;
      const db = client.db("Kwik");
      const Invoice = await db.collection("Invoices").findOne(
        {_id: new ObjectId(query.toString())
        }) as Invoice
      !Invoice ? res.status(404).json({'error': 'Error finding Id'}) : 
      res.status(200).json(Invoice);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}