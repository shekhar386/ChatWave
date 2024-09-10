import Chat from '../models/Chat';
import Message, { IMessage } from '../models/Message';

class MessageService {
  async sendMessage(messageData: Partial<IMessage>): Promise<IMessage> {
    const newMessage = new Message(messageData);
    await newMessage.save();

    await Chat.findByIdAndUpdate(newMessage.chat, {
      latestMessage: newMessage._id,
    });

    return (await newMessage.populate('sender', '-password')).populate('chat');
  }

  async getMessagesByChatId(chatId: string): Promise<IMessage[]> {
    return Message.find({ chat: chatId })
      .populate('sender', '-password')
      .populate('chat');
  }

  async updateMessage(
    messageId: string,
    updateData: Partial<IMessage>,
  ): Promise<IMessage | null> {
    return Message.findByIdAndUpdate(messageId, updateData, { new: true })
      .populate('sender', '-password')
      .populate('chat');
  }

  async deleteMessage(messageId: string): Promise<IMessage | null> {
    return Message.findByIdAndDelete(messageId);
  }
}

export default new MessageService();
