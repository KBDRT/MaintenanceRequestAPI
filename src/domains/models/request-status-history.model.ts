import { BeforeBulkDestroy, BeforeBulkUpdate, BeforeDestroy, BeforeUpdate, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { MaintenanceRequestStatus } from "../enums/maintenance-request-status.enum.js";
import type{ MaintenanceRequest as MaintenanceRequestModel } from "./maintenance-request.model.js";
import { MaintenanceRequest } from "./maintenance-request.model.js";

@Table({
  timestamps: true,
  updatedAt: false,
})
export class RequestStatusHistory extends Model {

  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM(...Object.values(MaintenanceRequestStatus)),
    allowNull: true
  })
  declare oldStatus: MaintenanceRequestStatus | null;

  @Column({
    type: DataType.ENUM(...Object.values(MaintenanceRequestStatus)),
    allowNull: false
  })
  declare newStatus: MaintenanceRequestStatus;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare author: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  declare commentary: string;

  @CreatedAt
  declare createdAt: Date;

  @Column({
    type: DataType.UUID,
  })
  @ForeignKey(() => MaintenanceRequest)
  declare requestId: string;

  @BelongsTo(() => MaintenanceRequest)
  declare request: MaintenanceRequestModel;

  @BeforeUpdate
  static forbidUpdate() {
    throw new Error("История статусов не может быть изменена");
  }

  @BeforeBulkUpdate
  static forbidBulkUpdate() {
    throw new Error("Массовое обновление истории запрещено");
  }

  @BeforeDestroy
  static forbidDestroy() {
    throw new Error("История статусов не может быть удалена напрямую");
  }

  @BeforeBulkDestroy
  static forbidBulkDestroy() {
    throw new Error("Массовое удаление истории запрещено");
  }
}