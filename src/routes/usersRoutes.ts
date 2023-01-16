import { Router } from 'express';
import {
  validatePatchAvatar, validatePatchUser,
} from '../middlewares/validations';
import {
  getUser, getUsers, editUser, editAvatar, getCurrentUser,
} from '../controllers/usersController';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUser);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, validatePatchUser, editUser);
router.patch('/me/avatar', auth, validatePatchAvatar, editAvatar);

export default router;
