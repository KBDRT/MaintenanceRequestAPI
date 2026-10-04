import jwt from "jsonwebtoken";
import { UserRole } from "../../../src/domains/enums/user-role.enum";
import { User } from "../../../src/domains/models/user.model";
import { createDBUser } from "./db-factories/user-factory";

const ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_KEY ?? 'test-secret';

export async function loginAs(role: UserRole = UserRole.admin) {
  const user = await createDBUser({ role });

  const token = jwt.sign(
    { userId: user.id, role: user.role, login: user.login },
    ACCESS_SECRET,
    { expiresIn: '1h' },
  );

  return { token, user };
}

export async function loginAsUser(userId: string) {
  let user = await User.findByPk(userId);

  if (!user) {
    user = await createDBUser();
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role, login: user.login },
    ACCESS_SECRET,
    { expiresIn: '1h' },
  );

  return { token, user };
}