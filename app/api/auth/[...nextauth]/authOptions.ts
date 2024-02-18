import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';

import { Users, IUser } from '@/models/';
import { connectMongoDB } from '@/lib/mongodb';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials: Record<string, string>) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user: IUser | null = (await Users.findOne({ email })) as IUser;

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectMongoDB();
      const user: IUser | null = await Users.findOne({
        email: session.user.email,
      }).lean();

      return {
        ...session,

        user: {
          ...user,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/signout',
    error: '/error', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
