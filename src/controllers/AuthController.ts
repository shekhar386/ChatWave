import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  async register(req: Request, res: Response) {
    try {
        console.log('Received request body:', req.body);
      const { username, email, password } = req.body;
      const user = await AuthService.register(username, email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({ user, token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
