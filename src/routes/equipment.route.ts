import { Router } from 'express';
import { 
  createEquipment, 
  deleteEquipment, 
  getEquipment,
  getEquipments, 
  updateEquipment, 
  getEquipmentRequests,
  getEquipmentWeather
} from '../controllers/equipment.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { createEquipmentRequestSchema } from '../validators/schemas/equipment/create-equipment.schema.js';
import { updateEquipmentRequestSchema } from '../validators/schemas/equipment/update-equipment.schema.js';
import { idRequestSchema } from '../validators/schemas/common/id-request.schema.js';
import { parseFilterQuery } from '../middlewares/params-parser.middleware.js';
import { filterEquipmentSchema } from '../validators/schemas/equipment/filter-equipment.schema.js';
import { validateCleanQuery } from '../middlewares/clean-query-validator.middleware.js';
import { getEquipmentRequestsSchema } from '../validators/schemas/equipment/get-equipment-requests.schema.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { checkAccess } from '../middlewares/access.middleware.js';

const equipmentRouter = Router();

equipmentRouter.route('/')
      .get(authenticate, parseFilterQuery, validateCleanQuery(filterEquipmentSchema), getEquipments)
      .post(authenticate, checkAccess([]), validate({body: createEquipmentRequestSchema}), createEquipment);

equipmentRouter.route('/:id')
      .get(authenticate, validate({params: idRequestSchema}), getEquipment)
      .patch(authenticate, checkAccess([]), validate({params: idRequestSchema, body: updateEquipmentRequestSchema}), updateEquipment)
      .delete(authenticate, checkAccess([]), validate({params: idRequestSchema}), deleteEquipment);

equipmentRouter.route('/:id/requests')
      .get(authenticate, validate({params: idRequestSchema}), parseFilterQuery, validateCleanQuery(getEquipmentRequestsSchema), getEquipmentRequests);

equipmentRouter.route('/:id/weather')
      .get(authenticate, validate({params: idRequestSchema}), getEquipmentWeather);

export default equipmentRouter;