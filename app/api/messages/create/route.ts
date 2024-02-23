// url : /api/messages/create
import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Messages, IMessagePayload } from '@/models';
import { renderHtmlEmail, sendEmail } from '@/emails/email';

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

  const email = {
    from: 'notification@loveletter.bot',
    to: data.email,
    subject: 'Ton message est en cours de traitement',
    html: renderHtmlEmail('pendingMessage', { link: `https://loveletter.bot/${message._id}` }),
    text: `Ton message est en cours de traitement. Tu peux le voir ici : https://loveletter.bot/${message._id}`,
  };

  sendEmail(email);

  return NextResponse.json(message || { ok: false, message: 'Error creating message' });
};

export { createMessage as POST, createMessage as GET };
export const dynamic = 'force-dynamic';
