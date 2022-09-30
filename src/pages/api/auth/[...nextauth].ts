import NextAuth, { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/Mongodb";
import user from '../../../../model/user'
import bcrypt from 'bcrypt'

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const client = await clientPromise;
        const db = client.db("Kwik");

        const user = await db.collection("users").findOne({ email: email });

        if (user) {
          await signInUser(password, user)
          return {id: user._id, email: email}
        } else {
          return null;}
      },
    }),
  ],
  pages: {
    signIn:"/auth/login",
    signOut: '/auth/login',
    newUser: "/dashboard",
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

/**Handles password encryption and decryption*/
const signInUser = async(password: string, user: user) => {
  if (!user.password){
    throw new Error('invalid passowrd')
  }

  const match = await bcrypt.compare(password, user.password);
  
    if (!match){
        throw new Error("invalid email or password")
    }
}
