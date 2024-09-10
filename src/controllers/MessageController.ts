import { Request, Response } from 'express';
import MessageService from '../services/MessageService';
import { AuthenticatedRequest } from '../types';

class MessageController {
  async sendMessage(req: Request, res: Response) {
    try {
      const message = await MessageService.sendMessage({
        ...req.body,
        //@ts-ignore
        sender: req.user._id,
      });
      res.status(200).json(message);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'Failed to send message', message: error.message });
    }
  }

  async getMessageByChatId(req: Request, res: Response) {
    try {
      const { chatId } = req.params;
      const messages = await MessageService.getMessagesByChatId(chatId);
      res.status(200).json(messages);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'Failed to get messages', message: error.message });
    }
  }

  async updateMessage(req: Request, res: Response) {
    try {
      const { messageId } = req.params;
      const { content } = req.body;
      const updatedMessage = await MessageService.updateMessage(
        messageId,
        content,
      );
      res.status(200).json(updatedMessage);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'Failed to update message', message: error.message });
    }
  }

  async deleteMessage(req: Request, res: Response) {
    try {
      const { messageId } = req.params;
      await MessageService.deleteMessage(messageId);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'Failed to delete message', message: error.message });
    }
  }
}

export default new MessageController();
