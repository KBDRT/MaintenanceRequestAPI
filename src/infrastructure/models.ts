import { EquipmentPassport } from "../domains/models/equipment-passport.model";
import { Equipment } from "../domains/models/equipment.model";
import { MaintenanceRequest } from "../domains/models/maintenance-request.model";
import { RequestAssignee } from "../domains/models/request-assignee.model";
import { RequestStatusHistory } from "../domains/models/request-status-history.model";
import { Site } from "../domains/models/site.model";
import { Technician } from "../domains/models/technician.model";

export const modelsList = [
  Site, Equipment, EquipmentPassport,
  MaintenanceRequest, RequestStatusHistory,
  Technician, RequestAssignee,
] as const;