// url : /api/messages/create
import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Messages, IMessagePayload } from '@/models';

const createMessage = async (req:NextRequest): Promise<NextResponse | void> => {
  const data: IMessagePayload = await req.json().catch((err: any) => {
    console.error(err);
  });

  if (!data.email || !data.recipient || !data.message || !data.userData) {
    return NextResponse.json({
      ok: false,
      message: 'Invalid data',
    });
  }

  await connectMongoDB();

  const message = await Messages.create({
    email: data.email,
    recipient: data.recipient,
    message: data.message,
    userData: data.userData,
    status: 'pending',
  });

  if (!message) {
    return NextResponse.json({
      ok: false,
      message: 'Error creating message',
    });
  }

  return NextResponse.json(message);
};

export { createMessage as POST, createMessage as GET };
