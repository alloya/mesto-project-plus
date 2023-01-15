import { Router } from 'express';
import { validateCreateCard } from '../middlwares/validations';
import {
  deleteCard, createCard, putLike, deleteLike, getCards,
} from '../controllers/cardsController';
import auth from '../middlwares/auth';

const router = Router();

router.get('/', auth, getCards);
router.delete('/:cardId', auth, deleteCard);
router.post('/', auth, validateCreateCard, createCard);

router.put('/:cardId/likes', auth, putLike);
router.delete('/:cardId/likes', auth, deleteLike);

export default router;
