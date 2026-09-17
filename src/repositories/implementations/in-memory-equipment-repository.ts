import { Equipment } from '../../domains/entities/equipment.entity.js';
import { getEquipmentsRequest } from '../../dto/equipment/get-equipments.request.js';
import { IEquipmentRepository } from '../abstractions/equipment-repository.interface.js';

export class EquipmentRepositoryMemory implements IEquipmentRepository{

  private static equipments: Equipment[] = [];

  async get(request: getEquipmentsRequest): Promise<Equipment[]> {

     let filtered = EquipmentRepositoryMemory.equipments.filter(req =>
      (!request.status?.length || request.status.includes(req.status)))
      .filter(req =>
        (!request.type?.length || request.type.includes(req.type)));

    if (request.dateFrom) {
      const dateFrom = request.dateFrom;
      filtered = filtered.filter(req => !req.installedAt || req.installedAt >= dateFrom);
    }

    if (request.dateTo) {
      const dateTo = request.dateTo;
      filtered = filtered.filter(req => !req.installedAt || req.installedAt <= dateTo);
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
      return filtered.slice(start, end);
    }
    
    return filtered;
  }

  async add(newEquipment: Equipment): Promise<string> {
    EquipmentRepositoryMemory.equipments.push(newEquipment);
    return EquipmentRepositoryMemory.equipments.length.toString();
  }

  async getById(id: string): Promise<Equipment | undefined> {
    return EquipmentRepositoryMemory.equipments.find(x => x.id == id);
  }

  async update(updatedEquipment: Equipment): Promise<void> {
    this.delete(updatedEquipment.id);
    this.add(updatedEquipment);
  }

  async delete(id: string): Promise<void> {
    const newList = EquipmentRepositoryMemory.equipments.filter(n => n.id != id);
    EquipmentRepositoryMemory.equipments = newList;
  }

  async getBySerialNumber(serialNumber: string): Promise<Equipment | undefined> {
    return EquipmentRepositoryMemory.equipments.find(x => x.serialNumber == serialNumber);
  }

}