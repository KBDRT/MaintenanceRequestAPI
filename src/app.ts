import express from 'express';
import equipmentRouter from './routes/equipment.route.js';
import maintenanceRequestRouter from './routes/maintenance-request.route.js';
import { errorHandler } from './middlewares/errors-handler.middleware.js';
import { setRequestId } from './middlewares/request-id.middleware.js';
import appConfig from './config/app.config.js';
import { httpLogger } from './middlewares/pino-log.middleware.js';
import { endpointNotFound } from './middlewares/endpoint-not-found.middleware.js';
import rootRouter from './routes/root.route.js';
import helmet from 'helmet';
import { globalLimiter } from './config/rate-limit.config.js';
import { corsSettings } from './config/cors.config.js';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import reportsRouter from './routes/reports.route.js';
import { saveMetrics } from './middlewares/metrics.middleware.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger/swagger.config.js';
import { authenticate } from './middlewares/auth.middleware.js';

const app = express();

app.set('trust proxy', 1);

app.use(httpLogger);

app.use(saveMetrics);

app.use(helmet());
app.use(cors(corsSettings));

app.use(globalLimiter);

app.use(express.json({limit: appConfig.jsonLimit}));   

app.use(cookieParser()); 

app.use(setRequestId);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRouter);
app.use('/', rootRouter);
app.use('/api/equipments', authenticate, equipmentRouter);
app.use('/api/requests', authenticate, maintenanceRequestRouter);
app.use('/api/', reportsRouter);

app.use(endpointNotFound);

app.use(errorHandler);

export default app;
