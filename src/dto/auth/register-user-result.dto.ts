import { UserRole } from "../../domains/enums/user-role.enum";

export class RegisterUserResult {
  id!: string;
  login!: string;
  role!: UserRole;
}