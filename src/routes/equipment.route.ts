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
import { getEquipmentRequestSchema } from '../validators/schemas/get-equipment.schema.js';
import { createEquipmentRequestSchema } from '../validators/schemas/create-equipment.schema.js';
import { updateEquipmentRequestSchema } from '../validators/schemas/update-equipment.schema.js';
import { getEquipmentsRequestSchema } from '../validators/schemas/get-equipments.schema.js';

const router = Router();

router.route('/')
      .get(getEquipments)
      .post(validate({body: createEquipmentRequestSchema}), createEquipment);

router.route('/:id')
      .get(validate({params: getEquipmentRequestSchema}), getEquipment)
      .patch(validate({body: updateEquipmentRequestSchema}), updateEquipment)
      .delete(deleteEquipment);

router.route('/:id/requests')
      .get(getEquipmentRequests);

router.route('/:id/weather')
      .get(getEquipmentWeather);

export default router;