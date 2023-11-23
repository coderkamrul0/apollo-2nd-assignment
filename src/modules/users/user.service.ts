import { IOrders, IUser } from './user.interface';
import User from './user.model';

const createUser = async (userData: IUser) => {
  if (await User.isUserExist(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find(
    {},
    {username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );
  return result;
};

const getSingleUser = async (userId: number) => {
  if (!(await User.isUserExist(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOne({ userId },{orders: 0, __v:0, _id:0});
  return result;
};

const updateUser = async (userId: number, updatedData: Partial<IUser>) => {
  if (!(await User.isUserExist(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });
  return result;
};

const deleteUser = async (userId: number): Promise<IUser | null> => {
  if (!(await User.isUserExist(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOneAndDelete({ userId });
  return result;
};

const addOrder = async (userId: number, orderData: IOrders) => {
  if (!(await User.isUserExist(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.updateOne(
    { userId },
    {
      $push: {
        orders: { ...orderData },
      },
    },
  );
  return result;
};

const getAllOrders = async (userId: number) => {
  if (!(await User.isUserExist(userId))) {
    throw new Error('User not found!');
  }
  const user = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return user;
};

const calculateTotalPrice = async (userId: number) => {
  if (!(await User.isUserExist(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    {
      $project: { _id: 0, totalPrice: 1 },
    },
  ]);
  return result[0];
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
