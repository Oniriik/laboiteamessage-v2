import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Users: Model<IUser> = mongoose.models?.Users || mongoose.model<IUser>('Users', userSchema);

export type { IUser };
