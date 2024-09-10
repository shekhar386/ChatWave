import Chat, { IChat } from '../models/Chat';

class ChatService {
  async createChat(chatData: IChat): Promise<IChat> {
    const newChat = new Chat(chatData);
    return newChat.save();
  }

  async getAllChats(userId: string): Promise<IChat[]> {
    return Chat.find({ users: userId })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage');
  }

  async getChatById(chatId: string): Promise<IChat | null> {
    return Chat.findById(chatId)
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage');
  }

  async updateChat(
    chatId: string,
    updateData: Partial<IChat>,
  ): Promise<IChat | null> {
    return Chat.findByIdAndUpdate(chatId, updateData, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage');
  }

  async deleteChat(chatId: string): Promise<IChat | null> {
    return Chat.findByIdAndDelete(chatId);
  }
}

export default new ChatService();
