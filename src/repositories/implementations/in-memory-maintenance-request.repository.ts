import { Equipment } from '../../domains/entities/equipment.entity.js';
import { MaintenanceRequest } from '../../domains/entities/maintenance-request.entity.js';
import { getEquipmentsRequest } from '../../dto/contracts/equipment/get-equipments.request.js';
import { IEquipmentRepository } from '../abstractions/equipment-repository.interface.js';
import { IMaintenanceRequestRepository } from './../abstractions/maintenance-request.repository.interface.js';

export class MaintenanceRequestRepository implements IMaintenanceRequestRepository{
  get(request: getEquipmentsRequest): Promise<MaintenanceRequest[]> {
    throw new Error('Method not implemented.');
  }
  add(newRequest: MaintenanceRequest): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<MaintenanceRequest | undefined> {
    throw new Error('Method not implemented.');
  }
  update(updatedRequest: MaintenanceRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
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

  // async add(newEquipment: Equipment): Promise<string> {
  //   this.equipments.push(newEquipment);
  //   return this.equipments.length.toString();
  // }

  // async getById(id: string): Promise<Equipment | undefined> {
  //   return this.equipments.find(x => x.id == id);
  // }

  // async update(updatedEquipment: Equipment): Promise<void> {
  //   this.delete(updatedEquipment.id);
  //   this.add(updatedEquipment);
  // }

  // async delete(id: string): Promise<void> {
  //   const newList = this.equipments.filter(n => n.id != id);
  //   this.equipments = newList;
  // }

  // async getBySerialNumber(serialNumber: string): Promise<Equipment | undefined> {
  //   return this.equipments.find(x => x.serialNumber == serialNumber);
  // }

}