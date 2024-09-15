import express from 'express';
import { createPayment, getPayment , refundPayment} from '../controllers/paymentController';

const router = express.Router();

router.post('/', createPayment);
router.get('/:id', getPayment);
router.put('/:id/refund', refundPayment);

export default router;