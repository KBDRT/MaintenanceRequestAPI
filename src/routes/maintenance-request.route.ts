import { Router } from 'express';
import { createRequest, getRequests, getRequest, updateRequest, deleteRequest, updateRequestStatus } from '../controllers/maintenance-request.controller.js';

const maintenanceRequestRouter = Router();

maintenanceRequestRouter.route('/')
      .get(getRequests)
      .post(createRequest);

maintenanceRequestRouter.route('/:id')
      .get(getRequest)
      .patch(updateRequest)
      .delete(deleteRequest);

maintenanceRequestRouter.route('/:id/status')
      .patch(updateRequestStatus);

export default maintenanceRequestRouter;