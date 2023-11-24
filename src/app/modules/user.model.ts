/* eslint-disable no-unused-vars */
import { Model, Schema, UpdateQuery, model } from 'mongoose';
import { TUser, UserModel } from './user/user.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../config';

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    unique: true,
    max: 25,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
      validate: {
        validator: function (value: string) {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return firstNameStr === value;
        },
      },
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
      trim: true,
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid',
      },
    },
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String, String], required: true },
  address: {
    street: {
      type: String,
      required: [true, 'street is required'],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
    },
    country: {
      type: String,
      required: [true, 'country is required'],
    },
  },

  orders: [
    {
      productName: {
        type: String,
        required: [true, 'product name is required'],
      },
      price: {
        type: Number,
        required: [true, 'price is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'quantity is required'],
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//user update
// userSchema.statics.isUserExists = function (
//   userId: number,
// ): Promise<TUser | null> {
//   return this.findOne({ userId }).exec();
// };

// userSchema.statics.updateUserById = function (
//   userId: number,
//   updateData: UpdateQuery<TUser>,
// ): Promise<TUser | null> {
//   return this.findOneAndUpdate(userId, updateData).exec();
// };

// //user delete
// userSchema.statics.addProductToOrder = async function (
//   userId: number,
//   product: TUser,
// ): Promise<void> {
//   const user = await this.findOne({ userId });

//   if (!user) {
//     throw new Error(`User with userId ${userId} not found`);
//   }

//   if (!user.orders) {
//     user.orders = [];
//   }

//   user.orders.push(product);
//   await user.save();
// };

userSchema.statics.addProductToOrder = async function (
  userId: number,
  productData: {
    productName: string;
    price: number;
    quantity: number;
  },
): Promise<void> {
  const user = await this.findOne({ userId });

  if (!user) {
    throw new Error(`User with userId ${userId} not found`);
  }

  if (!user.orders) {
    user.orders = [];
  }

  // Add the product details to the orders array
  user.orders.push({
    productName: productData.productName,
    price: productData.price,
    quantity: productData.quantity,
  });

  await user.save();
};

export const User = model<TUser, UserModel>('User', userSchema);
