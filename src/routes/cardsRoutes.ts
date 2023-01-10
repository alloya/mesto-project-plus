import { Router } from 'express';
import {
  deleteCard, createCard, putLike, deleteLike, getCards,
} from '../controllers/cardsController';

const router = Router();

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', createCard);

router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', deleteLike);

export default router;
