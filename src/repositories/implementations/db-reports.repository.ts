import { col, fn, Op, QueryTypes } from "sequelize";
import { IReportsRepository } from "../abstractions/reports-repository.interface.js";
import { Equipment } from "../../domains/models/equipment.model.js";
import { MaintenanceRequest } from './../../domains/models/maintenance-request.model.js';
import { AppError } from "../../errors/app.error.js";
import { DatabaseError } from "../../errors/database.error.js";
import { RequestsStatusPriorityStats } from "../../dto/types/requests-status-priority-stats.dto.js";
import { RequestStatusHistory } from "../../domains/models/request-status-history.model.js";
import { MaintenanceRequestStatus } from "../../domains/enums/maintenance-request-status.enum.js";
import { GetRequestFinishTime } from "../../dto/types/get-request-finish-time.type.js";
import { GetEquipmentsAnalyticsRequest } from './../../dto/reports/get-equipments-analytics-request.dto.js';
import { EquipmentsLoadResult } from "../../dto/reports/equipments-load-result.dto.js";
import { sequelize } from "../../infrastructure/sequelize.js";


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
          where: {newStatus: {[Op.in]: [MaintenanceRequestStatus.done]}},
          attributes: [["createdAt", 'finishTime']],
        }],
        where: {status: {[Op.in]: [MaintenanceRequestStatus.done]}},
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

  async getEquipmentsAnalytics(request: GetEquipmentsAnalyticsRequest): Promise<EquipmentsLoadResult[]> {
    try{
      const status: MaintenanceRequestStatus[] = [MaintenanceRequestStatus.done];
      const result = await sequelize.query(
        `
          SELECT 
            e.id,
            e.name,
            e."serialNumber",
            ep."lastCheckDate",
            COUNT(mr.id) as "requests",
            SUM(ra.hours) as "sumPlannedHours",
            COUNT(CASE WHEN mr.status = ANY($1) THEN 1 END) as "finishedRequests"
          FROM "Equipment" as e
          LEFT JOIN "EquipmentPassports" as ep 
            ON e.id = ep."equipmentId"
          LEFT JOIN "MaintenanceRequests" as mr 
            ON e.id = mr."equipmentId"
              AND mr."createdAt" >= $2
              AND mr."createdAt" <= $3
          LEFT JOIN "RequestAssignees" as ra 
            ON ra."requestId" = mr.id
          GROUP BY e.id, e.name, e."serialNumber", ep."lastCheckDate"
          HAVING COUNT(CASE WHEN mr.status = ANY($1) THEN 1 END) >= $4
        `,
        {
          bind: [status, request.dateFrom, request.dateTo, request.minFinishedRequests],
          type: QueryTypes.SELECT
        }
      ) as unknown as EquipmentsLoadResult[];
      
      return result;
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
}

