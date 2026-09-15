import express, {Express} from 'express';
import router from './routes/equipment.route.js';

const app: Express = express();

app.use(express.json());          
// app.use(express.urlencoded({ extended: true })); 
app.use('/api', router);

export default app;
