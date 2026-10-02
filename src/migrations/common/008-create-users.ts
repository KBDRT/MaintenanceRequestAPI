import { DataTypes } from 'sequelize';
import { Migration } from '../../config/umzug.config.js';
import { AssigneeRole } from '../../domains/enums/assignee-role.enum.js';
import { UserRole } from '../../domains/enums/user-role.enum.js';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('Users', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    login: { type: DataTypes.STRING(255), allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.ENUM(...Object.values(UserRole)), allowNull: false, defaultValue: UserRole.viewer },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    technicianId: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
      references: { model: 'Technicians', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('Users', {});
};