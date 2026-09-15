import express, {Express} from 'express';
import router from './routes/equipment.route.js';

const app: Express = express();

app.use('/api', router);

export default app;
