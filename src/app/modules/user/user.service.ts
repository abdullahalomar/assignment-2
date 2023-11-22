import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserInDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserInDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserInDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUserInDB,
  getSingleUserInDB,
};
