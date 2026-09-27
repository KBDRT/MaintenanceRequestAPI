import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Equipment } from "./equipment.model.js";

@Table({
  timestamps: false,
})
export class Site extends Model {

  @Column({
    type: DataType.UUID,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare code: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  declare region: string;

  @Column({
    type: DataType.DECIMAL(10, 7),
    allowNull: false
  })
  declare latitude: number;

  @Column({
    type: DataType.DECIMAL(10, 7),
    allowNull: false
  })
  declare longitude: number;

  @HasMany(() => Equipment)
  declare equipments: Equipment[];
}