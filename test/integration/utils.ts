import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserRole } from "../../src/domains/enums/user-role.enum";
import { User } from "../../src/domains/models/user.model";
import { Equipment } from "../../src/domains/models/equipment.model";
import { EquipmentType } from "../../src/domains/enums/equipment-type.enum";
import { EquipmentStatus } from "../../src/domains/enums/equipment-status.enum";

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


type EquipmentOverrides = {
  id?: string;
  name?: string;
  type?: EquipmentType;
  serialNumber?: string;
  status?: EquipmentStatus;
  installedAt?: string;
};

export async function createDBEquipment(overrides: EquipmentOverrides = {}) {
  const equipment = await Equipment.create({
    id: overrides.id ?? randomUUID(),
    name: overrides.name ?? faker.commerce.productName(),
    type: overrides.type ?? EquipmentType.turbine,
    serialNumber: overrides.serialNumber ?? faker.string.alphanumeric(10).toUpperCase(),
    status: overrides.status ?? EquipmentStatus.maintenance,
    installedAt: overrides.installedAt ?? faker.date.past({ years: 1 }).toISOString().substring(0, 10),
  });

  return equipment;
}

export function createEquipmentBody() {
  return {
    name: "новое",
    type: "turbine",
    serialNumber: faker.string.alphanumeric(10).toUpperCase(),
    location: {
      lat: 10,
      lon: 30
    },
    status: "operational",
    installedAt: "2000-12-12"
  };
}