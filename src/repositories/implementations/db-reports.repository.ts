import { col, fn, Op } from "sequelize";
import { IReportsRepository } from "../abstractions/reports-repository.interface";
import { Equipment } from "../../domains/models/equipment.model";
import { MaintenanceRequest } from './../../domains/models/maintenance-request.model';
import { AppError } from "../../errors/app.error";
import { DatabaseError } from "../../errors/database.error";
import { RequestsStatusPriorityStats } from "../../dto/types/requests-status-priority-stats.dto";
import { RequestStatusHistory } from "../../domains/models/request-status-history.model";
import { MaintenanceRequestStatus } from "../../domains/enums/maintenance-request-status.enum";
import { GetRequestFinishTime } from "../../dto/types/get-request-finish-time.type";


export class ReportsRepository implements IReportsRepository {

  async getRequestFinishTime(siteId: string): Promise<GetRequestFinishTime[]> {
    try {
      const result = await MaintenanceRequest.findAll({
        attributes: [['createdAt', 'startTime'], ],
        include: [{
          model: Equipment,
          attributes: [],
          where: {siteId: siteId}},
        {
          model: RequestStatusHistory,
          where: {newStatus: {[Op.in]: [MaintenanceRequestStatus.done, MaintenanceRequestStatus.rejected]}},
          attributes: [["createdAt", 'finishTime']],
        }],
        where: {status: {[Op.in]: [MaintenanceRequestStatus.done, MaintenanceRequestStatus.rejected]}},
        raw: true,
        nest: true
      }) as unknown as GetRequestFinishTime[];

      return result;
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async countRequestsByStatusAndPriority(siteId: string): Promise<RequestsStatusPriorityStats[]> {
    try {
      const result = await MaintenanceRequest.findAll({
        attributes: ['status', 'priority', [fn("COUNT", col('*')), 'count']],
        include: [{
          model: Equipment,
          attributes: [],
          where: {siteId: siteId}
        }],
        group: ['MaintenanceRequest.status', 'MaintenanceRequest.priority'],
        raw: true
      }) as unknown as RequestsStatusPriorityStats[];

      return result;
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
}

