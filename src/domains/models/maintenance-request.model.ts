import { BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import type { Equipment as EquipmentType } from "./equipment.model.js";
import { Equipment } from "./equipment.model.js";
import { MaintenanceRequestPriority } from "../enums/maintenance-request-priotiry.enum.js";
import { MaintenanceRequestStatus } from "../enums/maintenance-request-status.enum.js";
import { RequestStatusHistory } from "./request-status-history.model.js";
import { Technician } from "./technician.model.js";
import { RequestAssignee } from "./request-assignee.model.js";

@Table
export class MaintenanceRequest extends Model {

  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(120),
    allowNull: false
  })
  declare title: string;

  @Column({
    type: DataType.STRING(2000),
    allowNull: true,
  })
  declare description?: string;

  @Column({
    type: DataType.ENUM(...Object.values(MaintenanceRequestPriority)),
    allowNull: false
  })
  declare priority: MaintenanceRequestPriority;

  @Column({
    type: DataType.ENUM(...Object.values(MaintenanceRequestStatus)),
    allowNull: false
  })
  declare status: MaintenanceRequestStatus;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  declare plannedAt: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  declare author?: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @Column({
    type: DataType.UUID,
  })
  @ForeignKey(() => Equipment)
  declare equipmentId: string;

  @BelongsTo(() => Equipment)
  declare equipment: EquipmentType;

  @HasMany(() => RequestStatusHistory, {
    onDelete: "CASCADE",   
    onUpdate: "CASCADE",
  })
  declare statusHistory: RequestStatusHistory[];

  @BelongsToMany(() => Technician, { 
    through: () => RequestAssignee,
    foreignKey: "requestId",
    otherKey: "technicianId"
  })
  declare techinicians: Technician[];

}