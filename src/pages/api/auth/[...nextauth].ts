import NextAuth, { Awaitable, NextAuthOptions, User } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/Mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import user from '../../../../model/user'
import bcrypt from 'bcrypt'

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const client = await clientPromise;
        const db = client.db("Kwik");

        const user = await db.collection("users").findOne({ email: email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          await signInUser(password, user)
          return {id: user._id, email: email}
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn:"/auth/login",
    signOut: '/auth/login',
    newUser: "/",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },   
};

export default NextAuth(authOptions);

/**Handles password hash match */
const signInUser = async(password: string, user: user) => {
  if (!user.password){
    throw new Error('invalid passowrd')
  }

  const match = await bcrypt.compare(password, user.password);
  
    if (!match){
        throw new Error("invalid email or password")
    }
}
