import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AssigneeRole } from "../enums/assignee-role.enum.js";
import type { MaintenanceRequest as MaintenanceRequestModel } from "./maintenance-request.model.js";
import { MaintenanceRequest } from "./maintenance-request.model.js";
import type { Technician as TechnicianModel } from "./technician.model.js";
import { Technician } from "./technician.model.js";

@Table({
  timestamps: false,
})
export class RequestAssignee extends Model {

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  declare hours: number;

  @Column({
    type: DataType.ENUM(...Object.values(AssigneeRole)),
    allowNull: false
  })
  declare role: AssigneeRole;

  @Column({
    type: DataType.UUID,
    primaryKey: true
  })
  @ForeignKey(() => MaintenanceRequest)
  declare requestId: string;

  @Column({
    type: DataType.UUID,
    primaryKey: true
  })
  @ForeignKey(() => Technician)
  declare technicianId : string;

  @BelongsTo(() => MaintenanceRequest)
  declare request: MaintenanceRequestModel;

  @BelongsTo(() => Technician)
  declare technician: TechnicianModel;
}

