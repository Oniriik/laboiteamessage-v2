import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Messages } from '@/models';

const cancelMessage = async (
  _req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> => {
  const { id } = params;
  await connectMongoDB();

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return NextResponse.json({
      ok: false,
      message: 'Invalid message id',
    });
  }

  const message = await Messages.findById(id).lean();

  if (!message) {
    // throw new Error('Message not found');
    throw new Error('Message not found');
  }

  if (message.status === 'sent') {
    throw new Error('Message already sent');
  }

  await Messages.updateOne({ _id: id }, { status: 'canceled' });

  return NextResponse.json({
    ...message,
    status: 'canceled',
  });
};

export { cancelMessage as POST };
