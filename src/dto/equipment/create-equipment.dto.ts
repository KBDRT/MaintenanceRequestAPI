import { EquipmentStatus } from "../../domains/enums/equipment-status.enum.js";
import { EquipmentType } from "../../domains/enums/equipment-type.enum.js";
import { EquipmentLocation } from '../../domains/values/equipment-location.value.js';

export interface CreateEquipmentDto {
  name: string;
  type: EquipmentType;
  serialNumber: string;
  location: EquipmentLocation;
  status: EquipmentStatus;
  installedAt: string;
}