import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { UpdateQuery } from 'mongoose';
import { TUser } from './user.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseData = userValidationSchema.parse(user);
    const result = await UserServices.createUserInDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserInDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await UserServices.getSingleUserInDB(id);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await UserServices.deleteUserInDB(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: deletedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// update
// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const updateData: UpdateQuery<TUser> = req.body;

//     const updatedUser = await UserServices.updateUserInDB(userId, updateData);

//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'User not found' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'User updated successfully!',
//       data: updatedUser,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: 'User not found',
//       error: {
//         code: 404,
//         description: 'User not found!',
//       },
//     });
//   }
// };
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData: UpdateQuery<TUser> = req.body;

    const updatedUser = await UserServices.updateUserInDB(userId, updateData);
    console.log(updateData);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        description:
          'Internal server error. Please check the server logs for details.',
      },
    });
  }
};
// update

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
