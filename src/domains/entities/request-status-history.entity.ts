import { MaintenanceRequestStatus } from "../enums/maintenance-request-status.enum.js";
import { RequestStatusHistory as HistoryModel } from './../models/request-status-history.model.js';

export class RequestStatusHistory {
  id!: string;
  oldStatus?: MaintenanceRequestStatus | null;
  newStatus!: MaintenanceRequestStatus;
  author?: string;
  commentary?: string;
  createdAt?: Date;

  static createFromModel(model: HistoryModel) {
    let statusHistory = new RequestStatusHistory();
    statusHistory.id = model.id;
    statusHistory.oldStatus = model.oldStatus;
    statusHistory.newStatus = model.newStatus;
    statusHistory.author = model.author;
    statusHistory.commentary = model.commentary;
    statusHistory.createdAt = model.createdAt;
    
    return statusHistory;
  }

  static createListFromModel(models: HistoryModel[]) {
    const history: RequestStatusHistory[] = [];
    for (const model of models) {
      history.push(this.createFromModel(model));
    }
    return history;
  }
}