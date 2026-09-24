import { Op } from 'sequelize';
import { MaintenanceRequest } from '../../domains/entities/maintenance-request.entity.js';
import { MaintenanceRequestStatus } from '../../domains/enums/maintenance-request-status.enum.js';
import { GetMaintenanceRequestsFilteredDto } from '../../dto/maintenance-request/get-maintenance-requests-filtered.dto.js';
import { GetRequests } from '../../dto/types/get-requests.type.js';
import { AppError } from '../../errors/app.error.js';
import { DatabaseError } from '../../errors/database.error.js';
import { IMaintenanceRequestRepository } from '../abstractions/maintenance-request-repository.interface.js';
import { FilterParser } from '../utils/filter-parser.js';
import { MaintenanceRequest as RequestModel } from './../../domains/models/maintenance-request.model';

export class RequestRepository implements IMaintenanceRequestRepository{

  async get(request: GetMaintenanceRequestsFilteredDto): Promise<GetRequests> {
    try {
      const parser = new FilterParser<GetMaintenanceRequestsFilteredDto>(request, "plannedAt");

      const result = await RequestModel.findAll({
        where: parser.filter, 
        order: parser.sort, 
        limit: parser.limit, 
        offset: parser.offset
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
      const result = await RequestModel.findByPk(id);
      
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

    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
}
