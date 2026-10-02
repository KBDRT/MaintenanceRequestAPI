import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config.js';
import { DataType } from 'sequelize-typescript';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('HttpMetrics', {
    id: { type: DataType.BIGINT, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    route: { type: DataTypes.STRING(255), allowNull: false },
    method: { type: DataTypes.STRING(10), allowNull: false },
    statusCode: { type: DataTypes.INTEGER, allowNull: false },
    durationMs: { type: DataTypes.DOUBLE, allowNull: false },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('HttpMetrics', {});
};