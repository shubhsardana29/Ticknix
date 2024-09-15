import express from 'express';
import { json } from 'body-parser';
import eventRoutes from './routes/eventRoutes';

const app = express();

app.use(json());
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Event service running on port ${PORT}`));