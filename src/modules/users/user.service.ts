import { IOrders, IUser } from './user.interface';
import User from './user.model';

const createUser = async (userData: IUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

const updateUser = async (userId: number, updatedData: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });
  return result;
};

const deleteUser = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ userId });
  return result;
};

const addOrder = async (userId: number, orderData: IOrders): Promise<void> => {
  const user = await User.findOne({ userId });
  if (user) {
    user.addOrder(orderData);
    await user.save();
  }
};

const getAllOrders = async (userId: number): Promise<IOrders[]> => {
  const user = await User.findOne({ userId }, { password: 0 });
  return user ? user.getAllOrders() : [];
};

const calculateTotalPrice = async (userId: number): Promise<number> => {
  const user = await User.findOne({ userId });
  return user ? user.calculateTotalPrice() : 0;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrders,
  calculateTotalPrice,
};
