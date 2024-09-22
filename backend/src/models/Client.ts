import Invoice from "./Invoice";
import { ClientAttributes, ClientCreationAttributes } from "../types";
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';

@Table({
  tableName: 'clients',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;
  
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(32),
    unique: true,
    allowNull: false,
  })
  declare cpf_cnpj: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare birth_date: string;  

  @Column({
    type: DataType.STRING(64),
    validate: {
      isEmail: true,
    },
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(64),
  })
  declare address_region: string;

  @Column({
    type: DataType.STRING(32),
  })
  declare address_city: string;

  @Column({
    type: DataType.STRING(32),
  })
  declare address_postal_code: string;

  @Column({
    type: DataType.STRING(64),
  })
  declare address_street: string;

  @Column({
    type: DataType.STRING(16),
  })
  declare address_number: string;

  @Column({
    type: DataType.STRING(64),
  })
  declare address_locality: string;

  @Column({
    type: DataType.STRING(16),
  })
  declare address_region_code: string;

  @Column({
    type: DataType.STRING(64),
  })
  declare address_country: string;

  @HasMany(() => Invoice)
  declare invoices: Invoice[];
}

export default Client;
