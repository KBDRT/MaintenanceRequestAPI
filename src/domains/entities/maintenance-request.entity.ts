import { randomUUID } from "node:crypto";
import { MaintenanceRequestPriority } from "../enums/maintenance-request-priotiry.enum.js";
import { MaintenanceRequestStatus } from "../enums/maintenance-request-status.enum.js";
import { MaintenanceRequest as RequestModel } from './../models/maintenance-request.model.js';
import { Technician } from "./technician.entity.js";

export class MaintenanceRequest {
  id!: string;
  equipmentId!: string;
  title!: string;
  description?: string;
  priority!: MaintenanceRequestPriority;
  status!: MaintenanceRequestStatus;
  planntedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  technicians?: Technician[] = [];

  static create(props: {equipmentId: string, title: string, description: string, priority: MaintenanceRequestPriority, planntedAt: string}) : MaintenanceRequest {
    let newRequest = new MaintenanceRequest();
    newRequest = {id: randomUUID(), createdAt: new Date().toISOString(), status: MaintenanceRequestStatus.new, ...props};
    
    return newRequest;
  }

  static createFromModel(model: RequestModel) {
    let request = new MaintenanceRequest();
    request.id = model.id;
    request.equipmentId = model.equipmentId;
    request.title = model.title;

    if (model.description)
      request.description = model.description;

    request.priority = model.priority;
    request.status = model.status;
    request.planntedAt = model?.plannedAt?.toISOString();
    request.createdAt = model?.createdAt?.toISOString();
    request.updatedAt = model?.updatedAt?.toISOString();

    if (model.techinicians && request.technicians) {
      for (const technician of model.techinicians) {
        request.technicians.push(Technician.createFromModel(technician));
      }
    }

    return request;
  }

  static createListFromModel(models: RequestModel[]) {
    const requests: MaintenanceRequest[] = [];
    for (const model of models) {
      requests.push(this.createFromModel(model));
    }
    return requests;
  }
}