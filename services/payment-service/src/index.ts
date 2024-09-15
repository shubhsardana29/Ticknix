import express from 'express';
import { json } from 'body-parser';
import paymentRoutes from './routes/paymentRoutes';

const app = express();

app.use(json());
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Payment service running on port ${PORT}`));