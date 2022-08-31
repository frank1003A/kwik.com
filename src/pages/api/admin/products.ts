import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId  } from 'mongodb'
import clientPromise from '../../../../lib/Mongodb'
import products from '../../../../model/products';

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {

  /**
   * Get Request: http://localhost:3000/api/admin/products
   */
   if (req.method === "GET") {
    try {
      const query = req.query.product_id;
      const client = await clientPromise;
      const db = client.db("Kwik");
      const User = (await db
        .collection("products")
        .find({ _id: query.toString() })
        .toArray()) as products[];
      !User
        ? res.status(404).json({ error: "Error finding Id" })
        : res.status(200).json(User);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //PATCH request: http://localhost:3000/api/products/?product_id
  if (req.method === "PATCH") {
    try {
      const query = req.query.product_id;
      const updatedProducts = req.body as products;
      const client = await clientPromise;
      const db = client.db("Kwik");
      const CLIENT = await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(query.toString()) },
          { $set: updatedProducts }
        );
      !CLIENT
        ? res.status(404).json({ error: "Error finding Id" })
        : res.status(200).json(CLIENT);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    }
  }

  //DELETE request: http://localhost:3000/api/products/?product_id
  if (req.method === "DELETE") {
    try {
      const query = req.query.product_id;
      const client = await clientPromise;
      const db = client.db("Kwik");
      let deletedProducts = await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(query.toString()) });
      res.status(200).json(deletedProducts);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
      console.log(err);
    }
  }
}