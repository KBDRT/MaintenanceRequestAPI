import { EquipmentPassport as Model } from './../models/equipment-passport.model';

export class EquipmentPassport {
  id!: string;
  manufacturer?: string;
  model?: string;
  nominalPower?: string;
  lastCheckDate?: string;

  static createFromModel(model: Model) {
    let passport = new EquipmentPassport();
    passport.id = model.id;
    passport.manufacturer = model.manufacturer;
    passport.model = model.model;
    passport.nominalPower = model.nominalPower;
    passport.lastCheckDate = model.lastCheckDate;

    return passport;
  }
}