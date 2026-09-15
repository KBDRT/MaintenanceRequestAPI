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

const router = Router();

router.route('/equipment')
      .get(getEquipments)
      .post(validate({body: createEquipmentRequestSchema}),createEquipment);

router.route('/equipment/:id')
      .get(validate({params: getEquipmentRequestSchema}), getEquipment)
      .patch(validate({body: updateEquipmentRequestSchema}), updateEquipment)
      .delete(deleteEquipment);

router.route('/equipment/:id/requests')
      .get(getEquipmentRequests);

router.route('/equipment/:id/weather')
      .get(getEquipmentWeather);

export default router;