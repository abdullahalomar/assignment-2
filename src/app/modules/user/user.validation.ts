import { z } from 'zod';

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string().max(20, {
      message: 'first name must be 20 or fewer characters long',
    }),
    lastName: z.string().max(20, {
      message: 'last name must be 20 or fewer characters long',
    }),
  }),
  age: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a boolean',
  }),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z
      .string()
      .max(30, { message: 'street must be 30 or fewer characters long' }),
    city: z
      .string()
      .max(30, { message: 'city must be 30 or fewer characters long' }),
    country: z
      .string()
      .max(30, { message: 'country must be 30 or fewer characters long' }),
  }),
});

export default userValidationSchema;
