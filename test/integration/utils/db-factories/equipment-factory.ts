import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { Equipment } from "../../../../src/domains/models/equipment.model";
import { EquipmentType } from "../../../../src/domains/enums/equipment-type.enum";
import { EquipmentStatus } from "../../../../src/domains/enums/equipment-status.enum";

type EquipmentOverrides = {
  id?: string;
  name?: string;
  type?: EquipmentType;
  serialNumber?: string;
  status?: EquipmentStatus;
  installedAt?: string;
  siteId?: string;
};

export async function createDBEquipment(overrides: EquipmentOverrides = {}) {
  const equipment = await Equipment.create({
    id: overrides.id ?? randomUUID(),
    name: overrides.name ?? faker.commerce.productName(),
    type: overrides.type ?? EquipmentType.turbine,
    serialNumber: overrides.serialNumber ?? faker.string.alphanumeric(10).toUpperCase(),
    status: overrides.status ?? EquipmentStatus.maintenance,
    installedAt: overrides.installedAt ?? faker.date.past({ years: 1 }).toISOString().substring(0, 10),
    siteId: overrides.siteId,
  });

  return equipment;
}

