import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config.js';
import { AssigneeRole } from '../../domains/enums/assignee-role.enum.js';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('RequestAssignees', {
		 requestId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: { model: "MaintenanceRequests", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    technicianId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: { model: "Technicians", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    hours: { type: DataTypes.DECIMAL(6, 2), allowNull: false, defaultValue: 0 },
    role: { type: DataTypes.ENUM(...Object.values(AssigneeRole)), allowNull: false },
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('RequestAssignees', {});
};