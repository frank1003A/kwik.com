import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId  } from 'mongodb'
import clientPromise from '../../../lib/Mongodb'
import user from '../../../model/user';
import bcrypt from 'bcrypt'

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {

  const hashPassword = async(userData: user) => {
    const salt = await bcrypt.genSalt(8);
    if (userData.password !== undefined) {
      userData.password = await bcrypt.hash(userData.password, salt);
    }
  }
   
    //GET request: http://localhost:3000/api/users
  if (req.method === "GET") {
    try {
      const client = await clientPromise; 
      const db = client.db("Kwik"); // connect to database 
      const users = await db.collection("users").find({}).toArray() as user[]
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //POST request: http://localhost:3000/api/user
  if (req.method === "POST") {
    try {
        const newUser = req.body as user //
        const client = await clientPromise
        const db = client.db("Kwik") // connect to database 
        await hashPassword(newUser) // password hash
        await db.collection("users").insertOne(newUser)
        res.status(201).json(newUser);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
  }

   //PATCH request: http://localhost:3000/api/users
   if (req.method === "PATCH") {
    try {
      const query = req.query.user_id 
      console.log(query)
      const updatedUserData = req.body as user
      const client = await clientPromise;
      const db = client.db("Kwik");
      const userData = await db.collection("users").updateOne(
        {_id: new ObjectId(query.toString())}, {$set: updatedUserData})
        console.log(userData)
      !userData ? res.status(404).json({'error': 'Error finding Id'}) : 
      res.status(200).json(userData);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      console.log(err.message)
    }
  }

  //DELETE request: http://localhost:3000/api/products
  if (req.method === "DELETE") {
    try {
      const query = req.query.user_id
      const client = await clientPromise;
      const db = client.db("Kwik");
      let deleteUser = await db.collection("users").deleteOne({_id : new  ObjectId(query.toString())})
      res.status(200).json(deleteUser);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
      console.log(err)
    }
  }
}
