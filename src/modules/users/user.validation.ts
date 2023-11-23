import z from 'zod';

export const fullNameSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});
export const addressSchema = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

export const ordersSchema = z.object({
  productName: z.string().min(1, { message: 'Product name is required' }),
  price: z.number().min(0, { message: 'Price must be a non-negative number' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export const UserValidation = z.object({
  userId: z.number().min(1, { message: 'User ID must be a positive number' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  fullName: fullNameSchema,
  age: z.number().min(1, { message: 'Age is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean().optional(),
  hobbies: z
    .array(z.string())
    .min(1, { message: 'At least one hobby is required' }),
  address: addressSchema,
  orders: z.array(ordersSchema).optional(),
});
