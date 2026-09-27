import { randomUUID } from "node:crypto";
import { Seeder } from "../../config/umzug.config";
import { MaintenanceRequestPriority } from "../../domains/enums/maintenance-request-priotiry.enum";
import { MaintenanceRequestStatus } from "../../domains/enums/maintenance-request-status.enum";
import { randomInt } from 'node:crypto';
import { seedEquipment } from "../common/002-create-equipment.seed";

const d = (iso: string) => new Date(iso);
const title = "ТЕСТОВЫЕ ДАННЫЕ";

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

export const up: Seeder = async ({ context: sequelize }) => {
  let requests = [];
  for (let index = 0; index < 5000; index++) {
    requests.push({...exampleRequest, id: randomUUID(), description: randomInt(1000, 1000001).toString()});
  }
  await sequelize.getQueryInterface().bulkInsert('MaintenanceRequests', requests);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('MaintenanceRequests', { title: title });
};