import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

class AuthService {
  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      throw new Error('Username or email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    return newUser.save();
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password.');
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' },
    );

    return { user, token };
  }
}

export default new AuthService();
