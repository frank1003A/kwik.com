import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/Mongodb";
import clients from "../../../../../model/clients";

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {
  const getUser = async (userId: string | string[], data: clients) => {
    if (!userId) return;
    let currentUser = "";
    if (typeof data === "object") {
      data.owner = userId as string;
      currentUser = data.owner;
    }
    return currentUser;
  };

  //GET request: http://localhost:3000/api/user/client/clients/?user_id
  if (req.method === "GET") {
    try {
      const query = req.query.user_id;
      const client = await clientPromise;
      const db = client.db("Kwik"); // connect to database
      const clients = (await db
        .collection("clients")
        .find({ owner: query.toString() })
        .toArray()) as clients[];
      res.status(200).json(clients);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //POST request: http://localhost:3000/api/user/client/clients/?user_id
  if (req.method === "POST") {
    try {
      const userid = req.query.user_id;
      const newClient = req.body as clients; //
      await getUser(userid, newClient);
      const client = await clientPromise;
      const db = client.db("Kwik"); // connect to database
      await db.collection("clients").insertOne(newClient);
      console.log(newClient);
      res.status(201).json(newClient);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}