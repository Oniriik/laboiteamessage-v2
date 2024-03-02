import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Accounts } from '@/models';

const addAccount = async (): Promise<NextResponse | void> => {
  await connectMongoDB();

  const account = {
    name: 'loveletter.bot2',
    makeUrl: 'https://hook.eu2.make.com/qrm76dbo26w9omiq7r222teqvo9e8uuh',
    dayCount: 0,
  };

  await Accounts.create(account);

  return NextResponse.json({ account });
};

export { addAccount as GET };
