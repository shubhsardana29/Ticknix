import express from 'express';
import adminRoutes from './routes/adminRoutes';
import { json } from 'body-parser';

const app = express();

app.use(json());
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Admin service running on port ${PORT}`));