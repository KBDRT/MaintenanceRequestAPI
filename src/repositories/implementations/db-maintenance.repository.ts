import { Op } from 'sequelize';
import { MaintenanceRequest } from '../../domains/entities/maintenance-request.entity.js';
import { MaintenanceRequestStatus } from '../../domains/enums/maintenance-request-status.enum.js';
import { GetMaintenanceRequestsFilteredDto } from '../../dto/maintenance-request/get-maintenance-requests-filtered.dto.js';
import { GetRequests } from '../../dto/types/get-requests.type.js';
import { AppError } from '../../errors/app.error.js';
import { DatabaseError } from '../../errors/database.error.js';
import { IMaintenanceRequestRepository } from '../abstractions/maintenance-request-repository.interface.js';
import { FilterParser } from '../utils/filter-parser.js';
import { MaintenanceRequest as RequestModel } from './../../domains/models/maintenance-request.model.js';
import requestAllowStatusChange from '../../config/request-allow-status-change.config.js';
import { ConflictError } from '../../errors/conflicts.error.js';
import { Technician } from '../../domains/models/technician.model.js';

export class RequestRepository implements IMaintenanceRequestRepository{

  async updateStatus(id: string, newStatus: MaintenanceRequestStatus): Promise<void> {
    try {
    // Повторная проверка для конкрурентного изменения
      const allowOldStatuses: MaintenanceRequestStatus[] = [];
      for (const key of Object.keys(requestAllowStatusChange) as MaintenanceRequestStatus[]) {
        const newStatuses = requestAllowStatusChange[key];

        if (newStatuses.findIndex(s => s === newStatus) > -1)
          allowOldStatuses.push(key);
      }

      if (allowOldStatuses.length === 0)
        throw new ConflictError("Изменение статуса запрещено");

      await RequestModel.update({ status: newStatus }, { where: { id: id, status: {[Op.in]: allowOldStatuses }}});
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async get(request: GetMaintenanceRequestsFilteredDto): Promise<GetRequests> {
    try {
      const parser = new FilterParser<GetMaintenanceRequestsFilteredDto>(request, "plannedAt");

      const result = await RequestModel.findAll({
        attributes: ['id', 'equipmentId', 'title', 'description', 'priority', 'status', 'plannedAt', 'createdAt', 'updatedAt'],
        where: parser.filter, 
        order: parser.sort, 
        limit: parser.limit, 
        offset: parser.offset,
         include: [
          { model: Technician },
        ],
      });

      const count = await RequestModel.count({ where: parser.filter });

      return {requests: MaintenanceRequest.createListFromModel(result), total: count};
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async add(newRequest: MaintenanceRequest): Promise<string> {
    try {

      const result = await RequestModel.create({
        id: newRequest.id,
        equipmentId: newRequest.equipmentId,
        title: newRequest.title,
        description:  newRequest?.description ?? null,
        priority:  newRequest.priority,
        status:  newRequest.status,
        planntedAt:  newRequest?.planntedAt ?? null,
      });

      return result.id;
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async getById(id: string): Promise<MaintenanceRequest | undefined> {
    try {
      const result = await RequestModel.findByPk(id, {
        attributes: ['id', 'equipmentId', 'title', 'description', 'priority', 'status', 'plannedAt', 'createdAt', 'updatedAt'],
        include: { model: Technician } 
      });
      
      if (!result) 
        return undefined;
      
      return MaintenanceRequest.createFromModel(result);
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async update(updatedRequest: MaintenanceRequest): Promise<void> {
    try {
      const [affected] = await RequestModel.update({...updatedRequest}, {where: {id: updatedRequest.id}});
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deleted = await RequestModel.destroy({where: {id: id}});
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async existWithStatuses(equipmentId: string, statuses: MaintenanceRequestStatus[]): Promise<boolean> {
    try {
      const count = await RequestModel.count({
        where: {
          status: {[Op.in]: statuses}, 
          equipmentId: equipmentId
        }
      })
      return count > 0;
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async addMass(newRequest: MaintenanceRequest[]): Promise<void> {
    try {
      await RequestModel.bulkCreate(newRequest.map(a => ({
        id: a.id,
        equipmentId: a.equipmentId,
        title: a.title,
        description: a.description,
        status: a.status,
        priority: a.priority,
        plannedAt: a.planntedAt
      })));
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
}
