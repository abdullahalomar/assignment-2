/* eslint-disable no-useless-catch */
import { UpdateQuery } from 'mongoose';
import { User } from '../user.model';
import { TUser } from './user.interface';

//create user
const createUserInDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exist!');
  }
  const result = await User.create(userData);
  return result;
};

//all user
const getAllUserInDB = async () => {
  const result = await User.find();
  return result;
};

// single user
const getSingleUserInDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

//update user
const updateUserInDB = async function (
  userId: number,
  data: UpdateQuery<TUser>,
): Promise<TUser | null> {
  const updateRes = User.findOneAndUpdate({ userId }, data, {
    new: true,
    select: { password: 0 },
  });
  return updateRes;
};

//delete user
const deleteUserInDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

//put order
const addProductOrderDB = async function (
  userId: number,
  productData: { productName: string; price: number; quantity: number },
): Promise<TUser | null> {
  try {
    console.log(productData);
    const productToUpdate = await User.findOneAndUpdate(
      { userId },
      {
        $push: {
          orders: {
            productName: productData.productName,
            price: productData.price,
            quantity: productData.quantity,
          },
        },
      },
      { new: true, select: { password: 0 } },
    );

    if (!productToUpdate) {
      throw new Error('User not found');
    }

    return productToUpdate;
  } catch (error) {
    throw error;
  }
};

// single order by user
const getSingleOrderInDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

// single user order total price
const getSingleOrderPriceInDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserInDB,
  getSingleUserInDB,
  deleteUserInDB,
  updateUserInDB,
  addProductOrderDB,
  getSingleOrderInDB,
  getSingleOrderPriceInDB,
};
