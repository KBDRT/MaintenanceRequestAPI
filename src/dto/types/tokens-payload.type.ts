import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../../domains/enums/user-role.enum";

export interface TokenPayload extends JwtPayload{
  userId?: string;
  role?: UserRole;
  login?: string;
  technicianId?: string;
}
