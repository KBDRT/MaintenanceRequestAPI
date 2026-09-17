import { randomUUID } from "node:crypto";
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
    newRequest = {id: randomUUID(), createdAt: new Date().toISOString(), status: MaintenanceRequestStatus.new, ...props};
    
    return newRequest;
  }
}