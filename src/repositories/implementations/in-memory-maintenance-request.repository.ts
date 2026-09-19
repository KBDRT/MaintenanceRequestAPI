import { MaintenanceRequest } from '../../domains/entities/maintenance-request.entity.js';
import { MaintenanceRequestStatus } from '../../domains/enums/maintenance-request-status.enum.js';
import { GetMaintenanceRequestsFilteredDto } from '../../dto/maintenance-request/get-maintenance-requests-filtered.dto.js';
import { GetRequests } from '../../dto/types/get-requests.type.js';
import { IMaintenanceRequestRepository } from '../abstractions/maintenance-request-repository.interface.js';

export class MaintenanceRequestRepository implements IMaintenanceRequestRepository{

  private static requests: MaintenanceRequest[] = [];

  async get(request: GetMaintenanceRequestsFilteredDto): Promise<GetRequests> {
     let filtered = MaintenanceRequestRepository.requests.filter(req =>
      (!request.status?.length || request.status.includes(req.status)))
      .filter(req =>
        (!request.priority?.length || request.priority.includes(req.priority)))
      .filter(req =>
        (!request.equipmentIds?.length || request.equipmentIds.includes(req.equipmentId)))
      .filter(req =>
        (!request.id?.length || request.id.includes(req.id)));

    if (request.dateFrom) {
      const dateFrom = request.dateFrom;
      filtered = filtered.filter(req => !req.planntedAt || req.planntedAt >= dateFrom);
    }

    if (request.dateTo) {
      const dateTo = request.dateTo;
      filtered = filtered.filter(req => !req.planntedAt || req.planntedAt <= dateTo);
    }

    if (request.sort && typeof request.sort != "string") {
      const sortRules = request.sort;
      const sortDirections = request.sortDirection;
      let index = 0;
      for (const fieldName of sortRules) {
        if (sortDirections && sortDirections[index]) {

          if (sortDirections[index] == "DESC") {
             filtered.sort((a, b) => String(b[fieldName]).localeCompare(String(a[fieldName])));
          }
          else {
             filtered.sort((a, b) => String(a[fieldName]).localeCompare(String(b[fieldName])));
          }

        }
        else {
          filtered.sort((a, b) => String(a[fieldName]).localeCompare(String(b[fieldName])));
        }
        index++;
      }
    }

    if (request.page && request.limit) {
      const start = (request.page - 1) * request.limit;
      const end = start + request.limit;
      const total = filtered.length;
      return {requests: filtered.slice(start, end), total: total};
    }
    
    return {requests: filtered, total: filtered.length};
  }

  async add(newRequest: MaintenanceRequest): Promise<string> {
    MaintenanceRequestRepository.requests.push(newRequest);
    return newRequest.id;
  }

  async addMass(newRequest: MaintenanceRequest[]): Promise<void> {
    MaintenanceRequestRepository.requests.push(...newRequest);
  }


  async getById(id: string): Promise<MaintenanceRequest | undefined> {
    return MaintenanceRequestRepository.requests.find(req => req.id == id);
  }

  async update(updatedRequest: MaintenanceRequest): Promise<void> {
    this.delete(updatedRequest.id);
    this.add(updatedRequest);
  }

  async delete(id: string): Promise<void> {
    const newList = MaintenanceRequestRepository.requests.filter(req => req.id != id);
    MaintenanceRequestRepository.requests = newList;
  }

  async existWithStatuses(equipmentId: string, statuses: MaintenanceRequestStatus[]): Promise<boolean> {
    return MaintenanceRequestRepository.requests.some(req => req.equipmentId == equipmentId && statuses.includes(req.status));
  }
}