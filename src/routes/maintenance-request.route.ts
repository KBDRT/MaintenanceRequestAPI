import { Router } from 'express';
import { createRequest, getRequests, deleteRequestTechnician, getRequest, updateRequest, deleteRequest, getRequestStatusHistory, updateRequestStatus, createRequestMass, setRequestTechnicians } from '../controllers/maintenance-request.controller.js';
import { validate } from '../middlewares/validator.middleware.js';
import { createRequestSchema } from '../validators/schemas/maintenance-request/create-request.schema.js';
import { idRequestSchema } from '../validators/schemas/common/id-request.schema.js';
import { updateRequestSchema } from '../validators/schemas/maintenance-request/update-request.schema.js';
import { updateRequestStatusSchema } from '../validators/schemas/maintenance-request/update-request-status.schema.js';
import { parseFilterQuery } from '../middlewares/params-parser.middleware.js';
import { validateCleanQuery } from '../middlewares/clean-query-validator.middleware.js';
import { filterRequestSchema } from '../validators/schemas/maintenance-request/filter-request.schema.js';
import { massImportRequestsSchema } from '../validators/schemas/maintenance-request/mass-import-requests.schema.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { setRequestTechniciansSchema } from '../validators/schemas/assignees/set-request-technicians.schema.js';
import { deleteAssigneesSchema } from '../validators/schemas/assignees/delete-assignees.schema.js';
import { checkAccess } from '../middlewares/access.middleware.js';
import { UserRole } from '../domains/enums/user-role.enum.js';

const maintenanceRequestRouter = Router();

maintenanceRequestRouter.route('/')
  .get(authenticate, parseFilterQuery, validateCleanQuery(filterRequestSchema), getRequests)
  .post(authenticate, checkAccess([UserRole.technician]), validate({body: createRequestSchema}), createRequest);

maintenanceRequestRouter.route('/:id')
  .get(authenticate, validate({params: idRequestSchema}), getRequest)
  .patch(authenticate, checkAccess([UserRole.technician]), validate({params: idRequestSchema, body: updateRequestSchema}), updateRequest)
  .delete(authenticate, checkAccess([]), validate({params: idRequestSchema}), deleteRequest);

maintenanceRequestRouter.route('/:id/status')
  .patch(authenticate, checkAccess([UserRole.technician]), validate({params: idRequestSchema, body: updateRequestStatusSchema}), updateRequestStatus);

maintenanceRequestRouter.route('/import')
  .post(authenticate, checkAccess([UserRole.technician]), validate({body: massImportRequestsSchema}), createRequestMass);

maintenanceRequestRouter.route('/:id/assignees')
  .post(authenticate, checkAccess([]), validate({params: idRequestSchema, body: setRequestTechniciansSchema}), setRequestTechnicians);

maintenanceRequestRouter.route('/:id/assignees/:userId')
  .delete(authenticate, checkAccess([]), validate({params: deleteAssigneesSchema}), deleteRequestTechnician);

maintenanceRequestRouter.route('/:id/history')
  .get(authenticate, validate({params: idRequestSchema}), getRequestStatusHistory);

export default maintenanceRequestRouter;

