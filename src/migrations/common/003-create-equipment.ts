import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config.js';
import { EquipmentType } from '../../domains/enums/equipment-type.enum.js';
import { EquipmentStatus } from '../../domains/enums/equipment-status.enum.js';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('Equipment', {
		id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    type: { type: DataTypes.ENUM(...Object.values(EquipmentType)), allowNull: false },
    // unique выключен для мягкого удаления (paranoid), уникальность с помощью индекса (миграция 008)
    serialNumber: { type: DataTypes.STRING(255), allowNull: false}, 
    status: { type: DataTypes.ENUM(...Object.values(EquipmentStatus)), allowNull: false },
    installedAt: { type: DataTypes.DATEONLY, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
    siteId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "Sites", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('Equipment', {});
};