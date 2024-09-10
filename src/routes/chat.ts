import express from 'express';
import ChatController from '../controllers/ChatController';
import authMiddleware from '../middleware/auth';

const chatRoutes = express.Router();

chatRoutes.use(authMiddleware);

chatRoutes.post('/', ChatController.createChat);
chatRoutes.get('/', ChatController.getAllChats);
chatRoutes.get('/:chatId', ChatController.getChatById);
chatRoutes.put('/:chatId', ChatController.updateChat);
chatRoutes.delete('/:chatId', ChatController.deleteChat);

export default chatRoutes;
