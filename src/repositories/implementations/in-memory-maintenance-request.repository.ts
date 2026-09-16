import { MaintenanceRequest } from '../../domains/entities/maintenance-request.entity.js';
import { getEquipmentsRequest } from '../../dto/contracts/equipment/get-equipments.request.js';
import { IMaintenanceRequestRepository } from './../abstractions/maintenance-request.repository.interface.js';

export class MaintenanceRequestRepository implements IMaintenanceRequestRepository{

  private static requests: MaintenanceRequest[] = [];

  async get(request: getEquipmentsRequest): Promise<MaintenanceRequest[]> {
    throw new Error('Method not implemented.');
  }

  async add(newRequest: MaintenanceRequest): Promise<string> {
    MaintenanceRequestRepository.requests.push(newRequest);
    return newRequest.id;
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

  // private equipments: Equipment[] = [];

  // async get(request: getEquipmentsRequest): Promise<Equipment[]> {

  //   let filtered = this.equipments.filter(x =>
  //     (!request.status?.length || request.status.includes(x.status)))
  //     .filter(x =>
  //       (!request.type?.length || request.type.includes(x.type)));

  //   if (request.dateFrom) {
  //     const dateFrom = request.dateFrom;
  //     filtered = filtered.filter(x => x.installedAt >= dateFrom);
  //   }

  //   if (request.dateTo) {
  //     const dateTo = request.dateTo;
  //     filtered = filtered.filter(x => x.installedAt <= dateTo);
  //   }

  //   if (request.sort && typeof request.sort != "string") {
  //     const sortRules = request.sort;
  //     const sortDirections = request.sortDirection;
  //     let index = 0;
  //     for (const fieldName of sortRules) {
  //       if (sortDirections && sortDirections[index]) {

  //         if (sortDirections[index] == "DESC") {
  //            filtered.sort((a, b) => String(b[fieldName]).localeCompare(String(a[fieldName])));
  //         }
  //         else {
  //            filtered.sort((a, b) => String(a[fieldName]).localeCompare(String(b[fieldName])));
  //         }

  //       }
  //       else {
  //         filtered.sort((a, b) => String(a[fieldName]).localeCompare(String(b[fieldName])));
  //       }
  //       index++;
  //     }
  //   }

  //   return filtered;
  // }
}