/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IFullName = {
  firstName: string;
  lastName: string;
};

export type IAddress = {
  street: string;
  city: string;
  country: string;
};

export type IOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive?: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IOrders[];
};

// for creating static
export interface UserModel extends Model<IUser> {
  isUserExist(userId: number): Promise<IUser | null>;
}
