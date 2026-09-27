import { MigrationTest } from "../../config/umzug.config";

export const up: MigrationTest = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addIndex('Equipment', {
    name: 'uq_equipment_serial_active',
    fields: ['serialNumber'],
    unique: true,
    where: { deletedAt: null }, 
  });
};

export const down: MigrationTest = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeIndex('Equipment', 'uq_equipment_serial_active');
};

