
import { Router } from 'express';
import { addRequisition, listRequisitions } from '../controllers/requisitionController';

const router = Router();

router.post('/add', addRequisition);
router.post('/list', listRequisitions);

export default router;