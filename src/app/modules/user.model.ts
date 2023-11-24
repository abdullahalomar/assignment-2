import { Schema, UpdateQuery, model } from 'mongoose';
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

// userSchema.statics.isUserExists = async function (userId: number) {
//   const existingUSer = await User.findOne({ userId });
//   return existingUSer;
// };

// update
userSchema.statics.isUserExists = function (
  userId: number,
): Promise<TUser | null> {
  return this.findOne({ userId }).exec();
};

userSchema.statics.updateUserById = function (
  userId: number,
  updateData: UpdateQuery<TUser>,
): Promise<TUser | null> {
  return this.findOneAndUpdate(userId, updateData).exec();
};

// delete
userSchema.statics.deleteUserById = function (
  userId: number,
): Promise<TUser | null> {
  return this.findByIdAndDelete(userId).exec();
};
// userSchema.methods.isUserExists = async function (userId: string) {
//   const existingUser = await User.findOne({ userId });
//   return existingUser;
// };

export const User = model<TUser, UserModel>('User', userSchema);
