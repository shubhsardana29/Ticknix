import express from 'express';
import { json } from 'body-parser';
import userRoutes from './routes/userRoutes';


const app = express();

app.use(json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));