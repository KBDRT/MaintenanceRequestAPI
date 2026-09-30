import { User } from "../../domains/entities/user.entity.js";
import { AppError } from "../../errors/app.error.js";
import { DatabaseError } from "../../errors/database.error.js";
import { IUserRepository } from "../abstractions/user-repository.interface.js";
import { User as Model } from './../../domains/models/user.model.js';

export class UserRepository implements IUserRepository{

  async getByLogin(login: string): Promise<User | undefined> {
    try {
      const result = await Model.findOne({
        // attributes: ['id', 'oldStatus', 'newStatus', 'author', 'commentary', 'createdAt'],
        where: {login: login}
      });

      if (!result) return undefined;

      return User.createFromModel(result);
    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  }

  async create(user: User): Promise<string> {
    try {
      const result = await Model.create({
        id: user.id,
        login: user.login,
        password: user.password,
        technicianId: user.technicianId ?? null,
        role: user.role
      });

      return result.id;

    }
    catch (error) {
      if (error instanceof AppError) 
        throw error;

      throw new DatabaseError(error);
    }
  } 
};