import express from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middleware/auth';

const userRoutes = express.Router();

userRoutes.use(authMiddleware);

userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/:id', UserController.getUserById);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);
userRoutes.post('/:id/contacts', UserController.addContact);
userRoutes.delete('/:id/contacts/:contactId', UserController.removeContacts);

export default userRoutes;
