import { Request } from 'express';
import { IUser } from './models/User';
import mongoose from 'mongoose';

export interface AuthenticatedRequest extends Request {
  user: mongoose.Types.ObjectId;
}
