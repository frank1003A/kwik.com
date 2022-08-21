import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId  } from 'mongodb'
import clientPromise from '../../../../lib/Mongodb'
import clients from '../../../../model/clients';

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {
   
    //GET request: http://localhost:3000/api/clients
  if (req.method === "GET") {
    try {
      const client = await clientPromise; 
      const db = client.db("Kwik"); // connect to database 
      const clients = await db.collection("clients").find({}).toArray() as clients[]
      res.status(200).json(clients);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //POST request: http://localhost:3000/api/clients
  if (req.method === "POST") {
    try {
        const newClient = req.body as clients //
        const client = await clientPromise
        const db = client.db("Kwik") // connect to database 
        await db.collection("clients").insertOne(newClient)
        res.status(201).json(newClient);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
  }

   //PATCH request: http://localhost:3000/api/clients
   if (req.method === "PATCH") {
    try {
      const query = req.query.client_id 
      const updatedClient = req.body as clients
      const client = await clientPromise;
      const db = client.db("Kwik");
      const CLIENT = await db.collection("clients").updateOne(
        {_id: new ObjectId(query.toString())}, {$set: updatedClient})
      !CLIENT ? res.status(404).json({'error': 'Error finding Id'}) : 
      res.status(200).json(CLIENT);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      console.log(err.message)
    }
  }

  if (req.method === "DELETE") {
    try {
      const query = req.query.client_id
      const client = await clientPromise;
      const db = client.db("Kwik");
      let deletedClient = await db.collection("clients").deleteOne({_id : new  ObjectId(query.toString())})
      res.status(200).json(deletedClient);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
      console.log(err)
    }
  }
}