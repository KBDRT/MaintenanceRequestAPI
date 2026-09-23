import { Equipment } from "../../domains/entities/equipment.entity";
import { GetEquipmentsFilteredDto } from "../../dto/equipment/get-equipments-filtered.dto";
import { GetEquipments } from "../../dto/types/get-equipments.type";
import { IEquipmentRepository } from "../abstractions/equipment-repository.interface";
import { Equipment as Model } from './../../domains/models/equipment.model';
import { FilterParser } from "../utils/filter-parser";
import { DatabaseError } from './../../errors/database.error';

export class EquipmentRepository implements IEquipmentRepository{

  async add(newEquipment: Equipment): Promise<string> {
    try {
      const result = await Model.create({...newEquipment});

      return result.id;
    }
    catch (error) {
      throw new DatabaseError(error);
    }
  }

  async get(request: GetEquipmentsFilteredDto): Promise<GetEquipments> {

    const parser = new FilterParser<GetEquipmentsFilteredDto>(request);

    const result = await Model.findAll({
      where: parser.filter, 
      order: parser.sort, 
      limit: parser.limit, 
      offset: parser.offset
    });

    const count = await Model.count({ where: parser.filter });

    return {equipments: Equipment.createListFromModel(result), total: count};
  }

  async getById(id: string): Promise<Equipment | undefined> {
    const result = await Model.findByPk(id);

    if (!result) 
      return undefined;
    
    return Equipment.createFromModel(result);
  }

  async update(updatedEquipment: Equipment): Promise<void> {
    const result = await Model.update({...updatedEquipment}, {where: {id: updatedEquipment.id}});
  }

  async delete(id: string): Promise<void> {
    const result = await Model.destroy({where: {id: id}});
  }
  
  async getBySerialNumber(serialNumber: string): Promise<Equipment | undefined> {

    const result = await Model.findOne({where: {serialNumber: serialNumber}}) ?? undefined;

    if (!result) 
      return undefined;

    return Equipment.createFromModel(result);
  }

}