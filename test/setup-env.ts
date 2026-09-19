import dotenv from 'dotenv';
dotenv.config({ quiet: true });

process.env.LOG_LEVEL = 'silent';

process.env.EQUIPMENTS_PATH = '/api/equipments'
process.env.REQUESTS_PATH = '/api/requests'