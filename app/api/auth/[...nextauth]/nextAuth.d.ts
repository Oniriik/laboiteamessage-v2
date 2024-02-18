import { DefaultSession } from 'next-auth';
import { IUser } from '@/models';

declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user'];
  }
}
