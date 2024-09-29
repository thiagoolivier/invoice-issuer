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
} from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: "customers",
  timestamps: true,
  paranoid: true,
  deletedAt: "deleted_at",
  createdAt: "created_at",
  updatedAt: "updated_at",
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

  @ForeignKey(() => User)
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;
}

export default Customer;
