import { Equipment } from '../../domains/entities/equipment.entity.js';
import { IEquipmentRepository } from '../abstractions/equipment-repository.interface.js';

export class EquipmentRepositoryMemory implements IEquipmentRepository{

  private equipments: Equipment[] = [];

  async get(): Promise<Equipment[]> {
    return this.equipments;
  }
  async add(newEquipment: Equipment): Promise<string> {
    this.equipments.push(newEquipment);
    return this.equipments.length.toString();
  }
  async getById(id: string): Promise<Equipment | undefined> {
    return this.equipments.find(x => x.id == id);
  }
  async update(updatedEquipment: Equipment): Promise<void> {
    this.delete(updatedEquipment.id);
    this.add(updatedEquipment);
  }
  async delete(id: string): Promise<void> {
    const newList = this.equipments.filter(n => n.id != id);
    this.equipments = newList;
  }
}