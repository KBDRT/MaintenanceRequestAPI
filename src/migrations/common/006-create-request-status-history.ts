import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config';
import { MaintenanceRequestStatus } from '../../domains/enums/maintenance-request-status.enum';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('RequestStatusHistories', {
		id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    oldStatus: { type: DataTypes.ENUM(...Object.values(MaintenanceRequestStatus)), allowNull: true },
    newStatus: { type: DataTypes.ENUM(...Object.values(MaintenanceRequestStatus)), allowNull: false },
    author: { type: DataTypes.STRING(255), allowNull: false },
    commentary: { type: DataTypes.STRING(1000), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    requestId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "MaintenanceRequests", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('RequestStatusHistories', {});
};