import { NextResponse } from 'next/server';
import { renderHtmlEmail, sendEmail } from '@/emails/email';

const sendMessage = async (): Promise<NextResponse | void> => {
  const message = {
    sender: 'Love letter',
    from: 'Love letter <notification@loveletter.bot>',
    to: 'timothe.lim@gmail.com',
    subject: 'Ton message a John Doe a été posté',
    html: renderHtmlEmail('htmlPendingMessage', { link: 'https://loveletter.bot' }),
    text: renderHtmlEmail('textPendingMessage', { link: 'https://loveletter.bot' }),
  };

  sendEmail(message);

  return NextResponse.json({ message });
};

export { sendMessage as GET };
export const dynamic = 'force-dynamic';
