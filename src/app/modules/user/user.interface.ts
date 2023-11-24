import { Model } from 'mongoose';
import {} from 'mongoose';

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: [
    {
      productName: string;
      price: number;
      quantity: number;
    },
  ];
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}

// export type UserMethods = {
//   isUserExists(userId: string): Promise<TUser | null>;
// };

// export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
