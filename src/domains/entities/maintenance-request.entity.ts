import { randomUUID } from "node:crypto";
import { EquipmentStatus } from "../enums/equipment-status.enum.js";
import { EquipmentType } from "../enums/equipment-type.enum.js";
import { EquipmentLocation } from "../value-objects/equipment-location.vo.js";
import { MaintenanceRequestPriority } from "../enums/maintenance-request-priotiry.enum.js";
import { MaintenanceRequestStatus } from "../enums/maintenance-request-status.enum.js";

export class MaintenanceRequest {
  id!: string;
  equipmentId!: string;
  title!: string;
  description?: string = "";
  priority!: MaintenanceRequestPriority;
  status!: MaintenanceRequestStatus;
  planntedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  static create(props: {equipmentId: string, title: string, description: string, priority: MaintenanceRequestPriority, planntedAt: string}) : MaintenanceRequest {
    let newRequest = new MaintenanceRequest();
    newRequest = {...props, id: randomUUID(), createdAt: new Date().toISOString(), status: MaintenanceRequestStatus.new};
    
    return newRequest;
  }
}