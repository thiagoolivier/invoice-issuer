import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
} from "sequelize-typescript";
import Customer from "./Customer";
import { InvoiceAttributes } from "../types";
import { Sequelize } from "sequelize";

type InvoiceCreationAttributes = Omit<InvoiceAttributes, "id">;

@Table({
  tableName: "invoices",
})
class Invoice
  extends Model<InvoiceAttributes, InvoiceCreationAttributes>
  implements InvoiceAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare payment_method: string;

  @Column(DataType.FLOAT)
  declare value: number;

  @Column(DataType.STRING)
  declare currency: string;

  @Column(DataType.DATE)
  declare due_date: Date;

  @Column(DataType.STRING)
  declare barcode: string;

  @Column(DataType.STRING)
  declare formatted_barcode: string;

  @Column(DataType.STRING)
  declare instruction_line1: string;

  @Column(DataType.STRING)
  declare instruction_line2: string;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  declare customer_id: number;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @Column({
    type: DataType.ENUM(
      "AUTHORIZED",
      "PAID",
      "IN_ANALISYS",
      "DECLINED",
      "CANCELED",
      "WAITING"
    ),
    allowNull: false,
    defaultValue: "WAITING",
  })
  declare status:
    | "AUTHORIZED"
    | "PAID"
    | "IN_ANALISYS"
    | "DECLINED"
    | "CANCELED"
    | "WAITING";

  @Column(DataType.STRING)
  declare reference_id: string;

  @Column(DataType.STRING)
  declare description: string;

  @Column(DataType.JSON)
  declare links: string;

  @CreatedAt
  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column({
    allowNull: false
  })
  declare created_at: Date;

  @UpdatedAt
  @Default(Sequelize.literal("CURRENT_TIMESTAMP"))
  @Column
  declare updated_at: Date;

  @DeletedAt
  @Column
  declare deleted_at: Date;
}

export default Invoice;
