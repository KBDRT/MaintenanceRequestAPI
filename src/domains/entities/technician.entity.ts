import { Technician as Model } from './../models/technician.model.js';

export class Technician {
  id?: string;
  tableNumber?: number;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  specialization?: string;

  static createFromModel(model: Model) {
    let technician = new Technician();
    technician.id = model.id;
    technician.tableNumber = model.tableNumber;
    technician.lastName = model.lastName;
    technician.firstName = model.firstName;
    technician.middleName = model.middleName;
    technician.specialization = model.specialization;
    
    return technician;
  }
}


