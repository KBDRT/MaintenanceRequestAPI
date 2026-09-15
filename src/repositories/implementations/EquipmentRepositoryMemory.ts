import { Equipment } from '../../domains/entities/Equipment.js';
import { IEquipmentRepository } from '../abstractions/IEquipmentRepository.js';

export class EquipmentRepositoryMemory implements IEquipmentRepository{
  async get(): Promise<Equipment[]> {
    throw new Error('Method not implemented.');
  }
  async add(newEquipment: Equipment): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async getById(id: string): Promise<Equipment> {
    throw new Error('Method not implemented.');
  }
  async update(updatedEquipment: Equipment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}