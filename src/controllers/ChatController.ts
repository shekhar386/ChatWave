import { Request, Response } from 'express';
import ChatService from '../services/ChatService';

const errorHandler = (error: any, res: Response) => {
  if (error instanceof Error) {
    res
      .status(500)
      .json({ error: 'Failed to get chats', message: error.message });
  } else {
    res.status(500).json({
      error: 'Failed to get chats',
      message: 'An unknown error occurred',
    });
  }
};

class ChatController {
  async createChat(req: Request, res: Response) {
    try {
      const chat = await ChatService.createChat(req.body);
      res.status(201).json(chat);
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async getAllChats(req: Request, res: Response) {
    try {
      const { user } = req.body;
      const chats = await ChatService.getAllChats(user._id);
      res.status(200).json(chats);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async getChatById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const chat = await ChatService.getChatById(id);

      if (!chat) {
        res.status(404).json({ error: 'Chat not found' });
      }

      res.status(200).json(chat);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async updateChat(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const chat = await ChatService.updateChat(id, req.body);

      if (!chat) {
        res.status(404).json({ error: 'Chat not found' });
      }

      res.status(200).json(chat);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async deleteChat(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const chat = await ChatService.deleteChat(id);

      if (!chat) {
        res.status(404).json({ error: 'Chat not found' });
      }

      res.status(200).json(chat);
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

export default new ChatController();
