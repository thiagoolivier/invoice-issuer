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
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
} from "sequelize-typescript";
import Customer from "./Customer";
import { Sequelize } from "sequelize";

@Table({
  tableName: "users",
})
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(64),
    validate: {
      isEmail: true,
    },
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(256),
    allowNull: false
  })
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

export default User;
