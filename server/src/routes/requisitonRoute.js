
import { Router } from 'express';
import { addRequisition, listRequisitions, getRequisition, acceptRequisition, listAllRequisitions } from '../controllers/requisitionController';

const router = Router();

router.post('/add', addRequisition);
router.get('/get', getRequisition);
router.get('/list', listRequisitions);
router.get('/all', listAllRequisitions);
router.post('/accept', acceptRequisition);

export default router;