import express from 'express';
import { getDashboardStats, getTransactionReport, getUserReport } from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', getDashboardStats);
router.get('/transactions', getTransactionReport);
router.get('/users', getUserReport);

export default router;