import express from 'express';
import { createTicket, getTickets, buyTicket , cancelTicket} from '../controllers/ticketController';

const router = express.Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.post('/:id/buy', buyTicket);
router.post('/:id/cancel', cancelTicket);

export default router;