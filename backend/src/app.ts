import dotenv from 'dotenv';

dotenv.config();

import sequelize from './config/database';
import express, { Application } from 'express';

import clientRoutes from './routes/clientRoutes';
import invoiceRoutes from './routes/invoiceRoutes';

const app: Application = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.use('/api/v1/', clientRoutes);
app.use('/api/v1/', invoiceRoutes);

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