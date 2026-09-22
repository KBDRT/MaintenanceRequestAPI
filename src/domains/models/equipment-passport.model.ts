import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Equipment } from "./equipment.model";

@Table({
  timestamps: false,
})
export class EquipmentPassport extends Model {

  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare manufacturer: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare model: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare nominalPower: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare lastCheckDate: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  @ForeignKey(() => Equipment)
  declare equipmentId: string;

  @BelongsTo(() => Equipment)
  declare equipment: Equipment;
}