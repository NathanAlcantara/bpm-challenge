
import { Router } from 'express';
import { getUser } from '../controllers/userContoller';

const router = Router();

router.get('/get', getUser);

export default router;