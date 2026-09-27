import { randomUUID } from "node:crypto";
import { SeederTest } from "../../config/umzug.config";
import { MaintenanceRequestPriority } from "../../domains/enums/maintenance-request-priotiry.enum";
import { MaintenanceRequestStatus } from "../../domains/enums/maintenance-request-status.enum";
import { randomInt } from 'node:crypto';
import { EquipmentType } from "../../domains/enums/equipment-type.enum";
import { EquipmentStatus } from "../../domains/enums/equipment-status.enum";

const d = (iso: string) => new Date(iso);
const title = "ТЕСТОВЫЕ ДАННЫЕ";

const seedEquipment = [{
  id: "d08587b1-9412-4ca7-a9bf-abdb8d891675",
  name: "Газовая турбина ГТ-1",
  type: EquipmentType.turbine,
  serialNumber: "TURB-MSQ-001",
  status: EquipmentStatus.operational,
  installedAt: "2026-06-15",
  siteId: null 
}];

const exampleRequest = {
  id: "daca7542-ca19-4e1b-a4c4-97c1c7f2c363",
  title: title,
  description: "Обнаружена утечка масла из уплотнения.",
  priority: MaintenanceRequestPriority.high,
  status: MaintenanceRequestStatus.done,
  plannedAt: d("2024-06-01T09:00:00Z"),
  author: "Иванов И.И.",
  createdAt: d("2024-05-28T08:15:00Z"),
  updatedAt: d("2024-06-02T14:30:00Z"),
  equipmentId: seedEquipment[0].id,
}

export const up: SeederTest = async ({ context: sequelize }) => {

  await sequelize.getQueryInterface().bulkInsert('Equipment', seedEquipment);

  let requests = [];
  for (let index = 0; index < 5000; index++) {
    requests.push({...exampleRequest, id: randomUUID(), description: randomInt(1000, 1000001).toString()});
  }
  await sequelize.getQueryInterface().bulkInsert('MaintenanceRequests', requests);
};

export const down: SeederTest = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('MaintenanceRequests', { title: title });
  await sequelize.getQueryInterface().bulkDelete('Equipment', { id: seedEquipment[0].id });
};