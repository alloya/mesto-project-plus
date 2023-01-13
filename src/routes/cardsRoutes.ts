import { Router } from 'express';
import { validateCreateCard } from '../middlwares/validations';
import {
  deleteCard, createCard, putLike, deleteLike, getCards,
} from '../controllers/cardsController';

const router = Router();

router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.post('/', validateCreateCard, createCard);

router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

export default router;
