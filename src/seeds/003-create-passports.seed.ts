import { Seeder } from "../config/umzug.config";
import { seedEquipment } from "./002-create-equipment.seed";

export const seedPassports = [
  {
    id: "24c02fc8-1cee-432f-9738-2475b01b8844",
    manufacturer: "Siemens",
    model: "SGT-100",
    nominalPower: "5 МВт",
    lastCheckDate: "2024-06-10",
    equipmentId: seedEquipment[0].id,
  },
  {
    id: "284c3c5b-eb65-49d7-ab59-da38aa635629",
    manufacturer: "ABB",
    model: "PVS-100",
    nominalPower: "100 кВт",
    lastCheckDate: "2024-04-22",
    equipmentId: seedEquipment[1].id,
  },
  {
    id: "438b3c33-b36c-43c7-bd27-a3ed4f70742a",
    manufacturer: "Siemens",
    model: "SITRANS TS",
    nominalPower: "0.01 кВт",
    lastCheckDate: "2023-12-01",
    equipmentId: seedEquipment[3].id,
  },
  {
    id: "71b42c71-2224-46fd-b33c-80079c7d57d5",
    manufacturer: "Huawei",
    model: "SUN2000",
    nominalPower: "50 кВт",
    lastCheckDate: "2024-02-14",
    equipmentId: seedEquipment[4].id,
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('EquipmentPassports', seedPassports);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('EquipmentPassports', { id: seedPassports.map(u => u.id) });
};