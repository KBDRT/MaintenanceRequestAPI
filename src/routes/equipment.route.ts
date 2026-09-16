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
import { createEquipmentRequestSchema } from '../validators/schemas/create-equipment.schema.js';
import { updateEquipmentRequestSchema } from '../validators/schemas/update-equipment.schema.js';
import { idRequestSchema } from '../validators/schemas/id-request.schema.js';

const router = Router();

router.route('/')
      .get(getEquipments)
      .post(validate({body: createEquipmentRequestSchema}), createEquipment);

router.route('/:id')
      .get(validate({params: idRequestSchema}), getEquipment)
      .patch(validate({params: idRequestSchema, body: updateEquipmentRequestSchema}), updateEquipment)
      .delete(validate({params: idRequestSchema}), deleteEquipment);

router.route('/:id/requests')
      .get(validate({params: idRequestSchema}), getEquipmentRequests);

router.route('/:id/weather')
      .get(validate({params: idRequestSchema}), getEquipmentWeather);

export default router;