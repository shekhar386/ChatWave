import User, { IUser } from '../models/User';

class UserService {
  async getAllUsers(): Promise<IUser[]> {
    return User.find().select('-password');
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId).select('-password');
  }

  async updateUser(
    userId: string,
    updateData: Partial<IUser>,
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, updateData, { new: true }).select(
      '-password',
    );
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    return User.findByIdAndDelete(userId);
  }

  async addContact(userId: string, contactId: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { contacts: contactId },
      },
      { new: true },
    ).select('-password');
  }

  async removeContacts(
    userId: string,
    contactId: string,
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      userId,
      { $pull: { contacts: contactId } },
      { new: true },
    ).select('-password');
  }
}

export default new UserService();
