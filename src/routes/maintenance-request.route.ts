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

const maintenanceRequestRouter = Router();

maintenanceRequestRouter.route('/')
      .get(getEquipments)
      .post(validate({body: createEquipmentRequestSchema}), createEquipment);

maintenanceRequestRouter.route('/:id')
      .get(validate({params: idRequestSchema}), getEquipment)
      .patch(validate({params: idRequestSchema, body: updateEquipmentRequestSchema}), updateEquipment)
      .delete(validate({params: idRequestSchema}), deleteEquipment);

maintenanceRequestRouter.route('/:id/status')
      .patch(validate({params: idRequestSchema}), getEquipmentRequests);

export default maintenanceRequestRouter;