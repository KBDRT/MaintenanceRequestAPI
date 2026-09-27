import { Migration } from '../config/umzug.config';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addIndex('Equipment', {
    name: 'uq_equipment_serial_active',
    fields: ['serialNumber'],
    unique: true,
    where: { deletedAt: null }, 
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeIndex('Equipment', 'uq_equipment_serial_active');
};

