import { EquipmentStatus } from "../enums/EquipmentStatus.js";
import { EquipmentType } from "../enums/EquipmentType.js";
import { EquipmentLocation } from "../value-objects/EquipmentLocation.js";

export class Equipment {
  id!: string;
  name!: string;
  type!: EquipmentType;
  serialNumber!: string;
  location!: EquipmentLocation;
  status!: EquipmentStatus;
  installedAt!: string;
}