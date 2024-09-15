import express from 'express';
import { createEvent, updateEvent, deleteEvent, getEvents, getEvent } from '../controllers/eventController';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;