import mongoose, { Document, Schema } from 'mongoose';

export interface IChat extends Document {
  name?: string;
  isGroupChat: boolean;
  users: mongoose.Types.ObjectId[];
  latestMessage?: mongoose.Types.ObjectId;
  groupAdmin?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema: Schema = new Schema(
  {
    name: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    groupAdmin: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default mongoose.model<IChat>('Chat', ChatSchema);
