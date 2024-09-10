import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer', '');

    if (!token) {
      throw new Error('JWT token is undefined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      throw new Error('User not found during JWT authentication');
    }

    //@ts-ignore
    req.user = user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: 'Authentication Error', details: err as string });
  }
};

export default authMiddleware;
