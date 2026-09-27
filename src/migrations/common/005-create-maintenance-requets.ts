import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config';
import { MaintenanceRequestPriority } from '../../domains/enums/maintenance-request-priotiry.enum';
import { MaintenanceRequestStatus } from '../../domains/enums/maintenance-request-status.enum';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('MaintenanceRequests', {
		id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    title: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.STRING(2000), allowNull: true },
    priority: { type: DataTypes.ENUM(...Object.values(MaintenanceRequestPriority)), allowNull: false },
    status: { type: DataTypes.ENUM(...Object.values(MaintenanceRequestStatus)), allowNull: false },
    plannedAt: { type: DataTypes.DATE, allowNull: true },
    author: { type: DataTypes.STRING(255), allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    equipmentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "Equipment", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('MaintenanceRequests', {});
};