import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/Mongodb";
import user from "../../../../model/user";
import bcrypt from "bcrypt";

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {
  const hashPassword = async (userData: user) => {
    const salt = await bcrypt.genSalt(8);
    if (userData.password !== undefined) {
      userData.password = await bcrypt.hash(userData.password, salt);
    }
  };

  //GET request: http://localhost:3000/api/users
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("Kwik"); // connect to database
      const users = (await db.collection("users").find({}).toArray()) as user[];
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //POST request: http://localhost:3000/api/user
  if (req.method === "POST") {
    try {
      const newUser = req.body as user; //
      const client = await clientPromise;
      const db = client.db("Kwik"); // connect to database
      await hashPassword(newUser); // password hash
      await db.collection("users").insertOne(newUser);
      res.status(201).json(newUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  //PATCH request: http://localhost:3000/api/users
  if (req.method === "PATCH") {
    try {
      const query = req.query.user_id;
      console.log(query);
      const updatedUserData = req.body as user;
      const client = await clientPromise;
      const db = client.db("Kwik");
      const userData = await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(query.toString()) },
          { $set: updatedUserData }
        );
      !userData
        ? res.status(404).json({ error: "Error finding Id" })
        : res.status(200).json(userData);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    }
  }

  /***
   * DELETE request: http://localhost:3000/api/admin/users
   * Deletes a user account and all associated Invoices
   * 62f5df551bbedf0b5634360e
   */
  if (req.method === "DELETE") {
    try {
      const query = req.query.user_id;
      const client = await clientPromise;
      const db = client.db("Kwik");
      /**Delete user */
      let deleteUser = await db
        .collection("users")
        .deleteOne({ _id: new ObjectId(query.toString()) });

      /**Delete Invoices */
      let deleteInvoices = await db
        .collection("Invoices")
        .deleteMany({ owner: query.toString() });

      /**Delete Clients */
      let deleteClients = await db
        .collection("clients")
        .deleteMany({ owner: query.toString() });

      /**Delete Products */
      let deleteProducts = await db
        .collection("products")
        .deleteMany({ owner: query.toString() });

      if (deleteUser && deleteInvoices && deleteClients && deleteProducts) {
        console.log({
          user_id: query,
          user_no: deleteUser.deletedCount,
          invoice_no: deleteInvoices.deletedCount,
          client_no: deleteClients.deletedCount,
          product_no: deleteProducts.deletedCount,
        });
        res.status(200).json({
          user_id: query,
          user_no: deleteUser.deletedCount,
          invoice_no: deleteInvoices.deletedCount,
          client_no: deleteClients.deletedCount,
          product_no: deleteProducts.deletedCount,
        });
      } else {
        /**Abort method if conditions are not met */
        res.status(401).json({ error: "aborted" });
        return;
      }
    } catch (err: any) {
      res.status(400).json({ message: err.message });
      console.log(err);
    }
  }
}
