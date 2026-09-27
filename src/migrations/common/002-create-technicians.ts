import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config.js';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('Technicians', {
		id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    tableNumber: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    lastName: { type: DataTypes.STRING(255), allowNull: false },
    firstName: { type: DataTypes.STRING(255), allowNull: false },
    middleName: { type: DataTypes.STRING(255), allowNull: true },
    specialization: { type: DataTypes.STRING(500), allowNull: false },
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('Technicians', {});
};