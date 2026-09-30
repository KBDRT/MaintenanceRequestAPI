import { BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { MaintenanceRequest } from "./maintenance-request.model.js";
import { RequestAssignee } from "./request-assignee.model.js";
import { User } from "./user.model.js";
import type { User as UserModel } from "./user.model.js";

@Table({
  timestamps: false,
})
export class Technician extends Model {

  @Column({
    type: DataType.UUID,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  declare tableNumber: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  declare middleName: string;

  @Column({
    type: DataType.VIRTUAL,
    get(this: Technician): string {
      return [this.lastName, this.firstName, this.middleName]
        .filter(Boolean)
        .join(" ");
    },
  })
  declare fullName: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false
  })
  declare specialization: string;

  @BelongsToMany(() => MaintenanceRequest, 
  { 
    through: () => RequestAssignee,
    foreignKey: "technicianId",
    otherKey: "requestId"
  })
  declare requests: MaintenanceRequest[];

  @HasOne(() => User)
    declare user: UserModel;
}
