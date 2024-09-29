import { UserAttributes, UserCreationAttributes } from "../types";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasOne,
  ForeignKey,
} from "sequelize-typescript";
import Customer from "./Customer";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
  deletedAt: "deleted_at",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING(64))
  declare email: string;

  @Column(DataType.STRING(256))
  declare password: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    defaultValue: "customer",
  })
  declare role: string;

  @Column(DataType.INTEGER)
  @ForeignKey(() => Customer)
  declare customer_id: number;

  @HasOne(() => Customer)
  declare customer: Customer;
}

export default User;
