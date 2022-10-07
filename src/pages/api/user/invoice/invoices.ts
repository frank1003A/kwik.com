import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/Mongodb";
import { Invoice } from "../../../../../components/Data/types";

export default async function Kwik(req: NextApiRequest, res: NextApiResponse) {
  const getUser = async (userId: string | string[], data: Invoice) => {
    if (!userId) return;
    let currentUser = "";
    if (typeof data === "object") {
      data.owner = userId as string;
      currentUser = data.owner;
    }
    return currentUser;
  };

  /**
   * Get Request: http://localhost:3000/api/user/invoice/invoices/?user_id
   * Get only user related invoices using the invoice owner field
   */
  if (req.method === "GET") {
    try {
      const query = req.query.user_id;
      const client = await clientPromise;
      const db = client.db("Kwik");
      const User = (await db
        .collection("Invoices")
        .find({ owner: query.toString() }).sort({invoiceDate: -1})
        .toArray()) as Invoice[];
      !User
        ? res.status(404).json({ error: "Error finding Id" })
        : res.status(200).json(User);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  //POST request: http://localhost:3000/api/user/invoice/invoices/?user_id
  if (req.method === "POST") {
    try {
      const userid = req.query.user_id;
      const newInvoice = req.body as Invoice; //
      await getUser(userid, newInvoice);
      const client = await clientPromise;
      const db = client.db("Kwik"); // connect to database
      await db.collection("Invoices").insertOne(newInvoice);
      res.status(201).json(newInvoice);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  //PATCH request: http://localhost:3000/api/user/invoice/invoices/?invoice_id
  if (req.method === "PATCH") {
    try {
      const query = req.query.invoice_id;
      const updatedInvoice = req.body as Invoice;
      const client = await clientPromise;
      const db = client.db("Kwik");
      const Invoice = await db
        .collection("Invoices")
        .updateOne(
          { _id: new ObjectId(query.toString()) },
          { $set: updatedInvoice }
        );
      !Invoice
        ? res.status(404).json({ error: "Error finding Id" })
        : res.status(200).json(Invoice);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
      console.log(err.message);
    }
  }

  //DELETE request: http://localhost:3000/api/user/invoice/invoices/?invoice_id
  if (req.method === "DELETE") {
    try {
      const query = req.query.invoice_id;
      const client = await clientPromise;
      const db = client.db("Kwik");
      let deletedInvoice = await db
        .collection("Invoices")
        .deleteOne({ _id: new ObjectId(query.toString()) });
      res.status(200).json(deletedInvoice);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
      console.log(err);
    }
  }
}
