import mongoose, { Schema, Model, Document } from 'mongoose';

// IMessage extends Document and IMessagePayload
export interface IAccount extends Document {
  name : string;
  makeUrl : string;
  dayCount : number;
  error? : string;
}

const accountsSchema = new Schema<IAccount>(
  {
    name: {
      type: String,
      required: true,
    },
    makeUrl: {
      type: String,
      required: true,
    },
    dayCount: {
      type: Number,
      required: true,
      default: 0,
    },
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Accounts: Model<IAccount> = mongoose.models?.Accounts || mongoose.model<IAccount>('Accounts', accountsSchema);
