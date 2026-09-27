import { Seeder } from "../config/umzug.config.js";
import { EquipmentStatus } from "../domains/enums/equipment-status.enum.js";
import { EquipmentType } from "../domains/enums/equipment-type.enum.js";
import { seedSites } from "./001-create-sites.seed.js";

export const seedEquipment = [
   {
    id: "d08587b1-9412-4ca7-a9bf-abdb8d891675",
    name: "Газовая турбина ГТ-1",
    type: EquipmentType.turbine,
    serialNumber: "TURB-MSQ-001",
    status: EquipmentStatus.operational,
    installedAt: "2026-06-15",
    siteId: seedSites[0].id, 
  },
  {
    id: "17f60162-05ed-46ec-a911-188951c720d8",
    name: "Инвертор ИВ-2",
    type: EquipmentType.inverter,
    serialNumber: "INVR-MSQ-002",
    status: EquipmentStatus.maintenance,
    installedAt: "2026-07-02",
    siteId: seedSites[0].id,
  },
  {
    id: "0b9a4c97-3f03-41c7-ba6d-1c6596ee4561",
    name: "Подстанция ПС-3",
    type: EquipmentType.substation,
    serialNumber: "SUBS-MSQ-003",
    status: EquipmentStatus.operational,
    installedAt: "2026-01-20",
    siteId: seedSites[0].id,
  },
  {
    id: "05118636-1b37-4f4f-a4db-68beec0f9196",
    name: "Датчик давления ДД-4",
    type: EquipmentType.sensor,
    serialNumber: "SENS-SPB-004",
    status: EquipmentStatus.fault,
    installedAt: "2026-07-08",
    siteId: seedSites[1].id, 
  },
  {
    id: "639a609c-aff2-4a39-8fce-7c22dd7feb54",
    name: "Инвертор ИВ-5",
    type: EquipmentType.inverter,
    serialNumber: "INVR-SPB-005",
    status: EquipmentStatus.operational,
    installedAt: "2026-08-30",
    siteId: seedSites[1].id,
  },
  {
    id: "5d6f1f9c-4fd8-41ae-8013-cc190ee46f8f",
    name: "Турбина Т-6 (старая)",
    type: EquipmentType.turbine,
    serialNumber: "TURB-SPB-006",
    status: EquipmentStatus.decommissioned,
    installedAt: "2016-05-12",
    siteId: seedSites[1].id,
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('Equipment', seedEquipment);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('Equipment', { id: seedEquipment.map(u => u.id) });
};