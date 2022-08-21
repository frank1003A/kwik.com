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