import { randomUUID } from "crypto";
import { UserRole } from "../../../../src/domains/enums/user-role.enum";
import { User } from "../../../../src/domains/models/user.model";
import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';

type UserOverrides = {
  id?: string;
  login?: string;
  password?: string;
  role?: UserRole;
  technicianId?: string;
};

export async function createDBUser(overrides: UserOverrides = {}) {
  const password = overrides.password ?? 'secret';

  const user = await User.create({
    id: overrides.id ?? randomUUID(),
    login: overrides.login ?? faker.internet.username(),
    password: await bcrypt.hash(password, Number(process.env.JWT_SALT_ROUNDS) || 4),
    role: overrides.role ?? UserRole.viewer,
    technicianId: overrides.technicianId
  });

  return user;
}