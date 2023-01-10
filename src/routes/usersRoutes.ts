import { Router } from 'express';
import {
  createUser, getUser, getUsers, editUser, editAvatar,
} from '../controllers/usersController';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', editUser);
router.patch('/users/me/avatar', editAvatar);

export default router;
