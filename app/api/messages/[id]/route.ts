// url : /api/messages/create
import { NextResponse, NextRequest } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Messages } from '@/models';

const getMessageById = async (
  _req:NextRequest,
  { params } :{ params:{ id:string } },
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
    return NextResponse.json({
      ok: false,
      message: 'Message not found',
    });
  }

  return NextResponse.json(message);
};

export { getMessageById as GET };
export const dynamic = 'force-dynamic';
