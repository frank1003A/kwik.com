import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId  } from 'mongodb'
import clientPromise from '../../../lib/Mongodb'
import products from '../../../model/products';

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {
   
    //GET request: http://localhost:3000/api/products
  if (req.method === "GET") {
    try {
      const client = await clientPromise; 
      const db = client.db("Kwik"); // connect to database 
      const Products = await db.collection("products").find({}).toArray() as products[]
      res.status(200).json(Products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //POST request: http://localhost:3000/api/products
  if (req.method === "POST") {
    try {
        const newProduct = req.body as products //
        const client = await clientPromise
        const db = client.db("Kwik") // connect to database 
        if (!newProduct._id) db.collection("products").insertOne(newProduct)
        res.status(201).json(newProduct);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
  }

   //PATCH request: http://localhost:3000/api/products
   if (req.method === "PATCH") {
    try {
      const query = req.query.product_id 
      const updatedProducts = req.body as products
      const client = await clientPromise;
      const db = client.db("Kwik");
      const CLIENT = await db.collection("products").updateOne(
        {_id: new ObjectId(query.toString())}, {$set: updatedProducts})
      !CLIENT ? res.status(404).json({'error': 'Error finding Id'}) : 
      res.status(200).json(CLIENT);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      console.log(err.message)
    }
  }

  //DELETE request: http://localhost:3000/api/products
  if (req.method === "DELETE") {
    try {
      const query = req.query.product_id
      const client = await clientPromise;
      const db = client.db("Kwik");
      let deletedProducts = await db.collection("products").deleteOne({_id : new  ObjectId(query.toString())})
      res.status(200).json(deletedProducts);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
      console.log(err)
    }
  }

  /**
   * route: product data transfer request: http://localhost:3000/api/products/ {body}
   * 
   * This `route` takes data from the product route to the invoice creation route.
   * It is a much safer way to transfer information from one route to another.
   * I don't know for now if it's an efficient implementation overall
   * It also has to be an authenticated route
   */
  if (req.method === "Get" && req.body) {
    try {
      /**
       * Expects an array of product data
       */
      const body = req.body

    } catch (error) {
      
    }
  }
}