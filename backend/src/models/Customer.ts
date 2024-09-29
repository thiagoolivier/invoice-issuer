import Invoice from "./Invoice";
import { CustomerAttributes, CustomerCreationAttributes } from "../types";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
} from "sequelize-typescript";
import User from "./User";
import { Sequelize } from "sequelize";

@Table({
  tableName: "customers",
})
class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
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

  @Column(DataType.STRING(64))
  declare address_region: string;

  @Column(DataType.STRING(32))
  declare address_city: string;

  @Column(DataType.STRING(32))
  declare address_postal_code: string;

  @Column(DataType.STRING(64))
  declare address_street: string;

  @Column(DataType.STRING(16))
  declare address_number: string;

  @Column(DataType.STRING(64))
  declare address_locality: string;

  @Column(DataType.STRING(16))
  declare address_region_code: string;

  @Column(DataType.STRING(64))
  declare address_country: string;

  @HasMany(() => Invoice)
  declare invoices: Invoice[];

  @ForeignKey(() => User)
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @CreatedAt
  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({
    allowNull: false
  })
  declare created_at: Date;

  @UpdatedAt
  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column
  declare updated_at: Date;

  @DeletedAt
  @Column
  declare deleted_at: Date;
}

export default Customer;
