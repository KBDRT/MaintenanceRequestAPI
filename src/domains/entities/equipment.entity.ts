import { randomUUID } from "node:crypto";
import { EquipmentStatus } from "../enums/equipment-status.enum.js";
import { EquipmentType } from "../enums/equipment-type.enum.js";
import { EquipmentLocation } from "../values/equipment-location.value.js";
import { Equipment as Model } from './../models/equipment.model';
import { EquipmentPassport } from "./equipment-passport.entity.js";

export class Equipment {
  id!: string;
  name!: string;
  type!: EquipmentType;
  serialNumber!: string;
  location!: EquipmentLocation;
  status!: EquipmentStatus;
  installedAt!: string;
  passport?: EquipmentPassport;

  static create(props: {name: string, type: EquipmentType, serialNumber: string, location: EquipmentLocation, status: EquipmentStatus, installedAt: string}):Equipment {
    let newEquipment = new Equipment();
    newEquipment = {id: randomUUID(), ...props};
    
    return newEquipment;
  }

  static createFromModel(model: Model) {
    let equipment = new Equipment();
    equipment.id = model.id;
    equipment.name = model.name;
    equipment.type = model.type;
    equipment.serialNumber = model.serialNumber;
    equipment.status = model.status;
    equipment.installedAt = model.installedAt ?? "";

    equipment.location = {
      lat: model.site ? Number(model.site.latitude) : 0,
      lon: model.site ? Number(model.site.longitude) : 0,
    };

    if (model.passport) {
      equipment.passport = EquipmentPassport.createFromModel(model.passport);
    }

    return equipment;
  }

  static createListFromModel(models: Model[]) {
    const equipments: Equipment[] = [];
    for (const model of models) {
      equipments.push(this.createFromModel(model));
    }
    return equipments;
  }

}