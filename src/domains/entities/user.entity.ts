import { UserRole } from '../enums/user-role.enum.js';
import { User as Model } from './../models/user.model.js';

export class User {
  id?: string;
  login: string = "";
  password: string = "";
  role!: UserRole;
  technicianId?: string;

  static createFromModel(model: Model) {
    let user = new User();
    user.id = model.id;
    user.login = model.login;
    user.password = model.password;
    user.role = model.role;
    user.technicianId = model.technicianId;

    return user;
  }
}


