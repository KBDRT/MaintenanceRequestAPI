import { Site } from "../domains/models/site.model.js";
import { Technician } from "../domains/models/technician.model.js";
import { Equipment } from "../domains/models/equipment.model.js";
import { EquipmentPassport } from "../domains/models/equipment-passport.model.js";
import { MaintenanceRequest } from "../domains/models/maintenance-request.model.js";
import { RequestStatusHistory } from "../domains/models/request-status-history.model.js";
import { RequestAssignee } from "../domains/models/request-assignee.model.js";
import { User } from './../domains/models/user.model';

export const modelsList = [
  Site, Technician, User, Equipment, 
  EquipmentPassport, MaintenanceRequest, 
  RequestStatusHistory, RequestAssignee,
] as const;