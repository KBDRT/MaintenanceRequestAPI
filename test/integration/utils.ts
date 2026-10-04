import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserRole } from "../../src/domains/enums/user-role.enum";
import { User } from "../../src/domains/models/user.model";
import { Equipment } from "../../src/domains/models/equipment.model";
import { EquipmentType } from "../../src/domains/enums/equipment-type.enum";
import { EquipmentStatus } from "../../src/domains/enums/equipment-status.enum";
import { MaintenanceRequestPriority } from "../../src/domains/enums/maintenance-request-priotiry.enum";
import { MaintenanceRequestStatus } from "../../src/domains/enums/maintenance-request-status.enum";
import { MaintenanceRequest } from "../../src/domains/models/maintenance-request.model";
import { Technician } from "../../dist/domains/models/technician.model";
import { AssigneeRole } from "../../src/domains/enums/assignee-role.enum";
import { RequestAssignee } from "../../dist/domains/models/request-assignee.model";

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


export async function createDBTechnician() {
  const technician = await Technician.create({
    id: randomUUID(),
    tableNumber: await Technician.count() + 1,
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    specialization: faker.person.jobTitle()
  });

  return technician;
}



type AssigneOverrides = {
  technicianId?: string;
  requestId?: string;
  role?: AssigneeRole.member
};

export async function createDBAssigne(overrides: AssigneOverrides = {}) {
  const assigne = await RequestAssignee.create({
    technicianId: overrides.technicianId ?? randomUUID(),
    requestId: overrides.requestId ?? randomUUID(),
    role: overrides.role ?? AssigneeRole.member,
    hours: faker.number.float({min: 0.5, max: 50, fractionDigits: 2})
  });

  return assigne;
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

export function createRequestBody() {
  return {
    equipmentId: randomUUID(),
    title: "заявка",
    description: "описание заявки",
    priority: "medium",
  };
}

type RequestOverrides = {
  id?: string;
  title?: string;
  priority?: MaintenanceRequestPriority;
  status?: MaintenanceRequestStatus;
  equipmentId?: string;
  createdById?: string;
};

export async function createDBRequest(overrides: RequestOverrides = {}) {
  const equipment = overrides.equipmentId
    ? { id: overrides.equipmentId }
    : await createDBEquipment();

  const user = overrides.createdById
    ? { id: overrides.createdById }
    : await createDBUser();

  return MaintenanceRequest.create({
    id: overrides.id ?? randomUUID(),
    title: overrides.title ?? faker.lorem.sentence({ min: 3, max: 5 }),
    priority: overrides.priority ?? MaintenanceRequestPriority.medium,
    status: overrides.status ?? MaintenanceRequestStatus.new,
    equipmentId: equipment.id,
    createdById: user.id,
  });
}