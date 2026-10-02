import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserRole } from "../enums/user-role.enum.js";
import { Technician } from "./technician.model.js";
import type { Technician as TechnicianModel } from "./technician.model.js";

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: false
})
export class User extends Model {

  @Column({
    type: DataType.UUID,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare login: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  declare password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.viewer
  })
  declare role: UserRole;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    unique: true,
  })
  @ForeignKey(() => Technician)
  declare technicianId: string;

  @BelongsTo(() => Technician)
  declare technician: TechnicianModel;

  @CreatedAt
  declare createdAt: Date;
}
