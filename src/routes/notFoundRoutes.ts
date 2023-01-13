import { Router } from 'express';
import { notExistingRoute } from '../utils/utils';

const router = Router();

router.get('/', notExistingRoute);
router.post('/', notExistingRoute);
router.put('/', notExistingRoute);
router.delete('/', notExistingRoute);
router.patch('/', notExistingRoute);

export default router;
