import { Equipment } from "../../domains/entities/equipment.entity";
import { GetEquipmentsFilteredDto } from "../../dto/equipment/get-equipments-filtered.dto";
import { GetEquipments } from "../../dto/types/get-equipments.type";
import { IEquipmentRepository } from "../abstractions/equipment-repository.interface";
import { Equipment as EquipmentModel } from './../../domains/models/equipment.model';
import { FilterParser } from "../utils/filter-parser";
import { DatabaseError } from './../../errors/database.error';
import { AppError } from "../../errors/app.error";
import { EquipmentPassport } from "../../domains/models/equipment-passport.model";
import { Site } from "../../domains/models/site.model";

export class EquipmentRepository implements IEquipmentRepository{

  async add(newEquipment: Equipment): Promise<string> {
    try {
      const result = await EquipmentModel.create({
        id: newEquipment.id,
        name: newEquipment.name,
        type: newEquipment.type,
        serialNumber: newEquipment.serialNumber,
        status: newEquipment.status,
        installedAt: newEquipment.installedAt,
      });

      return result.id;
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async get(request: GetEquipmentsFilteredDto): Promise<GetEquipments> {
    try {
      const parser = new FilterParser<GetEquipmentsFilteredDto>(request, "installedAt");

      const result = await EquipmentModel.findAll({
        attributes: ['id', 'name', 'type', 'serialNumber', 'status', 'installedAt'],
        where: parser.filter, 
        order: parser.sort, 
        limit: parser.limit, 
        offset: parser.offset,
        include: [
          { model: Site, attributes: ['latitude', "longitude"] },
          { model: EquipmentPassport}
        ],
      });

      const count = await EquipmentModel.count({ where: parser.filter });

      return {equipments: Equipment.createListFromModel(result), total: count};
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async getById(id: string): Promise<Equipment | undefined> {
    try {
      const result = await EquipmentModel.findByPk(id, {
        attributes: ['id', 'name', 'type', 'serialNumber', 'status', 'installedAt'],
        include: [
          { model: Site, attributes: ['latitude', "longitude"] },
          { model: EquipmentPassport }
        ],
      });

      if (!result) 
        return undefined;
      
      return Equipment.createFromModel(result);
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async update(updatedEquipment: Equipment): Promise<void> {
    try {
      const [affected] = await EquipmentModel.update({...updatedEquipment}, {where: {id: updatedEquipment.id}});
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deleted = await EquipmentModel.destroy({where: {id: id}});
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
  
  async getBySerialNumber(serialNumber: string): Promise<Equipment | undefined> {
    try {
      const result = await EquipmentModel.findOne({
        attributes: ['id', 'name', 'type', 'serialNumber', 'status', 'installedAt'], 
        where: {serialNumber: serialNumber}
      }) ?? undefined;

      if (!result) 
        return undefined;

      return Equipment.createFromModel(result);
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }
}