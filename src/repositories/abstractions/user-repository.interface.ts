import { User } from "../../domains/entities/user.entity";

export interface IUserRepository {
  getByLogin(login: string) : Promise<User | undefined>;
  create(user: User): Promise<string>;
}