import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user/user.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../config';
import { bool } from 'joi';
import { boolean } from 'zod';

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    unique: true,
    maxlength: [10, 'hedfheh'],
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
  isDeleted: {
    type: Boolean,
    default: false,
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
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware
userSchema.pre('find', function (next) {
  console.log(this);
});

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUSer = await User.findOne({ userId });
  return existingUSer;
};

// userSchema.methods.isUserExists = async function (userId: string) {
//   const existingUser = await User.findOne({ userId });
//   return existingUser;
// };

export const User = model<TUser, UserModel>('User', userSchema);
