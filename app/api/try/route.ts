import { NextResponse } from 'next/server';
import { renderHtmlEmail, sendEmail } from '@/emails/email';

const sendMessage = async (): Promise<NextResponse | void> => {
  const message = {
    sender: 'Love letter',
    from: 'notification@loveletter.bot',
    to: 'timot5924@gmail.com',
    subject: 'Ton message a John Doe a été posté',
    html: renderHtmlEmail('sentMessage', { text: 'Salut ca va ?', link: 'https://loveletter.bot' }),
    text: 'Ton message a John Doe a été posté. Tu peux le voir ici : https://loveletter.bot',
  };

  sendEmail(message);

  return NextResponse.json({ message });
};

export { sendMessage as GET };
