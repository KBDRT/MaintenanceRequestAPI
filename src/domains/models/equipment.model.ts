import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { EquipmentType } from "../enums/equipment-type.enum";
import { EquipmentStatus } from "../enums/equipment-status.enum";
import { Site } from "./site.model";
import { EquipmentPassport } from "./equipment-passport.model";
import { MaintenanceRequest } from "./maintenance-request.model";

@Table({
  timestamps: false,
})
export class Equipment extends Model {

  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataType.ENUM(...Object.values(EquipmentType)),
    allowNull: false
  })
  declare type: EquipmentType;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false
  })
  declare serialNumber: string;

  @Column({
    type: DataType.ENUM(...Object.values(EquipmentStatus)),
    allowNull: false
  })
  declare status: EquipmentStatus;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true
  })
  declare installedAt: string;

  @Column({
    type: DataType.UUID,
  })
  @ForeignKey(() => Site)
  declare siteId: string;

  @BelongsTo(() => Site)
  declare site: Site;

  @HasOne(() => EquipmentPassport, { foreignKey: "equipmentId", as: "passport" })
  declare passport: EquipmentPassport;

  @HasMany(() => MaintenanceRequest)
  declare requests: MaintenanceRequest[];
}