import mongoose, { Schema, Model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IMessagePayload {
  email: string;
  recipient: string;
  message: string;
  userData: {
    ip: string;
    country: string;
  };
}
// IMessage extends Document and IMessagePayload
export interface IMessage extends Document, IMessagePayload {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const messagesSchema = new Schema<IMessage>(
  {
    _id: {
      type: String,
      unique: true,
      required: true,
      default: () => `msg_${uuidv4()}`,
    },
    email: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userData: {
      ip: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Messages: Model<IMessage> = mongoose.models?.Messages || mongoose.model<IMessage>('Messages', messagesSchema);
