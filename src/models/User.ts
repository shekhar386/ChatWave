import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  contacts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedId: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IUser>('User', UserSchema);
