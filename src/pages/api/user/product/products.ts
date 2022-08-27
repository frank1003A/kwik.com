import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/Mongodb";
import products from "../../../../../model/products";

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {
  const getUser = async (userId: string | string[], data: products) => {
    if (!userId) return;
    let currentUser = "";
    if (typeof data === "object") {
      data.owner = userId as string;
      currentUser = data.owner;
    }
    return currentUser;
  };

  /**
   * Get Request: http://localhost:3000/api/user/product/products/?user_id
   * Get only user related products using the invoice owner field
   */
  if (req.method === "GET") {
    try {
      const query = req.query.user_id;
      const client = await clientPromise;
      const db = client.db("Kwik");
      const User = (await db
        .collection("products")
        .find({ owner: query.toString() })
        .toArray()) as products[];
      !User
        ? res.status(404).json({ error: "Error finding Id" })
        : res.status(200).json(User);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //POST request: http://localhost:3000/api/user/product/products/?user_id
  if (req.method === "POST") {
    try {
      const userid = req.query.user_id;
      const newProduct = req.body as products; //
      await getUser(userid, newProduct);
      const client = await clientPromise;
      const db = client.db("Kwik"); // connect to database
      if (!newProduct._id) db.collection("products").insertOne(newProduct);
      res.status(201).json(newProduct);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
