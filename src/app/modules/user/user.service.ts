import { FilterQuery, UpdateQuery } from 'mongoose';
import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserInDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exist!');
  }
  const result = await User.create(userData);
  return result;
};

const getAllUserInDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserInDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

const updateUserInDB = async function (
  userId: number,
  data: UpdateQuery<TUser>,
): Promise<TUser | null> {
  // const result = User.findOne({ userId });
  const updateRes = User.findOneAndUpdate({ userId }, data);
  return updateRes;
};

const deleteUserInDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserInDB,
  getSingleUserInDB,
  deleteUserInDB,
  updateUserInDB,
};
