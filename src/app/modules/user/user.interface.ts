import { Schema, model, connect } from 'mongoose';

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: string;
  email: string;
  isActive: boolean;
  hobbies: ['Reading', 'Hiking', 'Coding'];
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
