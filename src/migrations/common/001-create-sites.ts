import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config.js';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('Sites', {
		id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    code: { type: DataTypes.STRING(255), allowNull: false },
    region: { type: DataTypes.STRING(255), allowNull: false },
    latitude: { type: DataTypes.DECIMAL(10, 7), allowNull: false },
    longitude: { type: DataTypes.DECIMAL(10, 7), allowNull: false },
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('Sites', {});
};