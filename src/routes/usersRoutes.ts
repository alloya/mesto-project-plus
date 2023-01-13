import { Router } from 'express';
import {
  validateCreateUser, validatePatchAvatar, validatePatchUser,
} from '../middlwares/validations';
import {
  createUser, getUser, getUsers, editUser, editAvatar,
} from '../controllers/usersController';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', validateCreateUser, createUser);
router.patch('/me', validatePatchUser, editUser);
router.patch('/me/avatar', validatePatchAvatar, editAvatar);

export default router;
