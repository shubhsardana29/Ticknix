import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// Apply routes
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));