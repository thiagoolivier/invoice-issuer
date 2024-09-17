import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Invoice extends Model {
  public id!: number;
  public value!: number;
  public due_date!: Date;
  public status!: string; 
  public reference!: string; 
}

Invoice.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Pending','Paid'],
    allowNull: false,
    defaultValue: 'Pending',
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true,  // Reference to the externally generated invoice
  },
}, {
  sequelize,
  tableName: 'invoices',
  timestamps: true,
});

export default Invoice;
