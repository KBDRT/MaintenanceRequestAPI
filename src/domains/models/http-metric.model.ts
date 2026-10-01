import {  Column, CreatedAt, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
  updatedAt: false,
})
export class HttpMetric extends Model { 

  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  declare id: number;

  @CreatedAt
  declare createdAt: Date;

  @Column({ 
    type: DataType.STRING(255), 
    allowNull: false 
  })
  declare route: string;

  @Column({ 
    type: DataType.STRING(10), 
    allowNull: false 
  })
  declare method: string;

  @Column({ 
    type: DataType.INTEGER, 
    allowNull: false 
  })
  declare statusCode: number;

  @Column({ 
    type: DataType.DOUBLE, 
    allowNull: false 
  })
  declare durationMs: number;
}