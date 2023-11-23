import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserInDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exist!');
  }
  const result = await User.create(userData);

  // const user = new User(userData);
  // if (await user.isUserExists(userData.userId)) {
  //   throw new Error('User already exist!');
  // }
  // const result = await user.save();
  return result;
};

const getAllUserInDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserInDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

const deleteUserInDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserInDB,
  getSingleUserInDB,
  deleteUserInDB,
};
