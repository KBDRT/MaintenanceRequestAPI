import { randomUUID } from "node:crypto";
import { EquipmentStatus } from "../enums/equipment-status.enum.js";
import { EquipmentType } from "../enums/equipment-type.enum.js";
import { EquipmentLocation } from "../value-objects/equipment-location.vo.js";

export class Equipment {
  id!: string;
  name!: string;
  type!: EquipmentType;
  serialNumber!: string;
  location!: EquipmentLocation;
  status!: EquipmentStatus;
  installedAt!: string;

  static create(props: {name: string, type: EquipmentType, serialNumber: string, location: EquipmentLocation, status: EquipmentStatus, installedAt: string}):Equipment {
    let newEquipment = new Equipment();
    newEquipment = {id: randomUUID(), ...props};
    
    return newEquipment;
  }
}