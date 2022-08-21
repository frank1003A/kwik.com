// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId  } from 'mongodb'
import clientPromise from '../../../../lib/Mongodb'
import  UserClass from '../../../../model/user'

export default async function (req: NextApiRequest,res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const query = req.query.user_id 
      const client = await clientPromise;
      const db = client.db("Kwik");
      const User = await db.collection("users").findOne(
        {_id: new ObjectId(query.toString())
        }) as UserClass
      !User ? res.status(404).json({'error': 'Error finding Id'}) : 
      res.status(200).json(User);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}