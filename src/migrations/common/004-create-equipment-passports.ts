import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('EquipmentPassports', {
		id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    manufacturer: { type: DataTypes.STRING(255), allowNull: false },
    model: { type: DataTypes.STRING(255), allowNull: false },
    nominalPower: { type: DataTypes.STRING(255), allowNull: false },
    lastCheckDate: { type: DataTypes.DATEONLY, allowNull: false },
    equipmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: "Equipment", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('EquipmentPassports', {});
};