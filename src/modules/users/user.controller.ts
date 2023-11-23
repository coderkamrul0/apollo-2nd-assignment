/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserValidation } from './user.validation';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsData = UserValidation.parse(userData);
    const result = await UserServices.createUser(zodParsData);
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getSingleUser(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: {
        code: 404,
        description: error.message || 'Something went wrong!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const updatedData = req.body;
    const result = await UserServices.updateUser(userId, updatedData);
    res.status(200).json({
      status: 'true',
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: {
        code: 404,
        description: error.message || 'Something went wrong!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    await UserServices.deleteUser(userId);
    res.status(200).json({
      status: 'true',
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: {
        code: 404,
        description: error.message || 'Something went wrong!',
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    await UserServices.addOrder(userId, req.body);

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: {
        code: 404,
        description: error.message || 'Something went wrong!',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const orders = await UserServices.getAllOrders(userId);

    res.json({
      success: true,
      message: 'Order fetched successfully!',
      data:  orders ,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: {
        code: 404,
        description: error.message || 'Something went wrong!',
      },
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const totalPrice = await UserServices.calculateTotalPrice(userId);

    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: totalPrice || { totalPrice: 0 },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: {
        code: 404,
        description: error.message || 'Something went wrong!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrders,
  calculateTotalPrice,
};
