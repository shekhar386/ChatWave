import express from 'express';
import MessageController from '../controllers/MessageController';
import authMiddleware from '../middleware/auth';

const messageRoutes = express.Router();

messageRoutes.use(authMiddleware);

messageRoutes.post('/', MessageController.sendMessage);
messageRoutes.get('/:chatId', MessageController.getMessageByChatId);
messageRoutes.put('/:id', MessageController.updateMessage);
messageRoutes.delete('/:id', MessageController.deleteMessage);

export default messageRoutes;
