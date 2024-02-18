// url : /api/crons/sendMessage
import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Messages } from '@/models';
import { processImg } from '@/lib/images';
import files from '@/lib/files';
import { performHook } from '@/helpers';

const sendMessage = async (): Promise<NextResponse | void> => {
  await connectMongoDB();
  const pendingMessages = await Messages.find({ status: 'pending' }).exec();

  if (!pendingMessages.length) {
    return NextResponse.json({
      ok: false,
      message: 'No pending messages',
    });
  }

  const posts = (await Promise.all(pendingMessages.map(async (message) => {
    const { recipient } = message;

    const img = await processImg(recipient);
    const upload = await files.upload(img, recipient);
    if (!upload.url) return null;

    return {
      id: message._id,
      email: message.email,
      recipient: message.recipient,
      message: message.message,
      img: upload.url,
    };
  }))).filter(Boolean);

  const texts = posts.map((post) => `@${post?.recipient} : ${post?.message}`);

  const text = texts.join('\n-------\n');

  if (posts.length) {
    await performHook(
      'https://hook.eu2.make.com/kkdq3d63w2ve9cnknwwn367f49yt8tlj',
      {
        posts,
        text,
      },
    );
  }
  return NextResponse.json(posts);
};

export { sendMessage as GET };
