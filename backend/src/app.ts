import dotenv from 'dotenv';

dotenv.config();

import sequelize from './config/database';
import express, { Application } from 'express';

import customerRoutes from './routes/customerRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import loginRoutes from './routes/loginRoutes';

const app: Application = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.use('/api/v1/', customerRoutes);
app.use('/api/v1/', invoiceRoutes);
app.use('/api/v1/', loginRoutes);

async function startServer() {
  try {
    await sequelize.sync();
    console.info('Successfully connected to the database!');
    app.listen(port, () => {
      console.info(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

startServer();