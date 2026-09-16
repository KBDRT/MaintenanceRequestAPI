import express, {Express} from 'express';
import router from './routes/equipment.route.js';
import maintenanceRequestRouter from './routes/maintenance-request.route.js';

const app: Express = express();

app.use(express.json());          
// app.use(express.urlencoded({ extended: true })); 
app.use('/api/equipments', router);
app.use('/api/requests', maintenanceRequestRouter);

export default app;
