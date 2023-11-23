/* eslint-disable no-unused-vars */
import { Schema, model, Document } from 'mongoose';
import { IAddress, IFullName, IOrders, IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

interface IUserModel extends IUser, Document {
  addOrder(order: IOrders): void;
  getAllOrders(): IOrders[];
  calculateTotalPrice(): number;
}

const fullNameSchema = new Schema<IFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const ordersSchema = new Schema<IOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUserModel, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String], required: true },
  address: addressSchema,
  orders: { type: [ordersSchema], default: undefined },
});

userSchema.statics.isUserExist = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

userSchema.pre('save', async function (next) {
  const user = this as IUserModel;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  // delete user.orders;
  return user;
};

userSchema.methods.addOrder = function (order: IOrders) {
  if (!this.orders) {
    this.orders = [];
  }
  this.orders.push(order);
};

userSchema.methods.getAllOrders = function () {
  return this.orders || [];
};

userSchema.methods.calculateTotalPrice = function () {
  if (!this.orders || this.orders.length === 0) {
    return 0;
  }
  return this.orders.reduce(
    (total: number, order: IOrders) => total + order.price * order.quantity,
    0,
  );
};

const User = model<IUserModel, UserModel>('User', userSchema);
export default User;
