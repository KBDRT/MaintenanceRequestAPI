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

const equipmentRouter = Router();

equipmentRouter.route('/')
      .get(parseFilterQuery, validateCleanQuery(filterEquipmentSchema),getEquipments)
      .post(validate({body: createEquipmentRequestSchema}), createEquipment);

equipmentRouter.route('/:id')
      .get(validate({params: idRequestSchema}), getEquipment)
      .patch(validate({params: idRequestSchema, body: updateEquipmentRequestSchema}), updateEquipment)
      .delete(validate({params: idRequestSchema}), deleteEquipment);

equipmentRouter.route('/:id/requests')
      .get(validate({params: idRequestSchema}), getEquipmentRequests);

equipmentRouter.route('/:id/weather')
      .get(validate({params: idRequestSchema}), getEquipmentWeather);

export default equipmentRouter;