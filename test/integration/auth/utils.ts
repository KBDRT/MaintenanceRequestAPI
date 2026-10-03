import { randomUUID } from "node:crypto";
import { User } from "../../../src/domains/models/user.model";
import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import { UserRole } from "../../../src/domains/enums/user-role.enum";

type UserOverrides = {
  id?: string;
  login?: string;
  password?: string;
  role?: UserRole;
};

export async function createDBUser(overrides: UserOverrides = {}) {
  const password = overrides.password ?? 'secret';

  const user = await User.create({
    id: overrides.id ?? randomUUID(),
    login: overrides.login ?? faker.internet.username(),
    password: await bcrypt.hash(password, Number(process.env.JWT_SALT_ROUNDS) || 4),
    role: overrides.role ?? UserRole.viewer,
  });

  return user;
}