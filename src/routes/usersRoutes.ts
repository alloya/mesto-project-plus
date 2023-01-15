import { Router } from 'express';
import {
  validateCreateUser, validatePatchAvatar, validatePatchUser, validateLogin,
} from '../middlwares/validations';
import {
  createUser, getUser, getUsers, editUser, editAvatar, login, getCurrentUser,
} from '../controllers/usersController';
import auth from '../middlwares/auth';

const router = Router();

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUser);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, validatePatchUser, editUser);
router.patch('/me/avatar', auth, validatePatchAvatar, editAvatar);
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

export default router;
