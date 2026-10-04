import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { MaintenanceRequestPriority } from "../../../../src/domains/enums/maintenance-request-priotiry.enum";
import { MaintenanceRequestStatus } from "../../../../src/domains/enums/maintenance-request-status.enum";
import { MaintenanceRequest } from "../../..//../src/domains/models/maintenance-request.model";
import { createDBEquipment } from "./equipment-factory";

type RequestOverrides = {
  id?: string;
  title?: string;
  priority?: MaintenanceRequestPriority;
  status?: MaintenanceRequestStatus;
  equipmentId?: string;
  createdById?: string;
};

export async function createDBRequest(overrides: RequestOverrides = {}) {
  const equipment = overrides.equipmentId ? { id: overrides.equipmentId } : await createDBEquipment();

  return MaintenanceRequest.create({
    id: overrides.id ?? randomUUID(),
    title: overrides.title ?? faker.lorem.sentence({ min: 3, max: 5 }),
    priority: overrides.priority ?? MaintenanceRequestPriority.medium,
    status: overrides.status ?? MaintenanceRequestStatus.new,
    equipmentId: equipment.id,
  });
}