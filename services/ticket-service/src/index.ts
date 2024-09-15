import express from 'express';
import { json } from 'body-parser';
import ticketRoutes from './routes/ticketRoutes';

const app = express();

app.use(json());
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Ticket service running on port ${PORT}`));