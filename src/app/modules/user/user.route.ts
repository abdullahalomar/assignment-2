import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getSingleUser);
router.delete('/:userId', UserControllers.deleteUser);
router.put('/:userId', UserControllers.updateUser);
router.put('/:userId/orders', UserControllers.addProductOrder);
router.get('/:userId/orders', UserControllers.getSingleOrderByUser);

export const UserRoutes = router;
