
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

const router = Router();

router.route('/equipment')
      .get(getEquipments)
      .post(createEquipment);

router.route('/equipment/:id')
      .get(getEquipment)
      .patch(updateEquipment)
      .delete(deleteEquipment);

router.route('/equipment/:id/requests')
      .get(getEquipmentRequests);

router.route('/equipment/:id/weather')
      .get(getEquipmentWeather);

export default router;