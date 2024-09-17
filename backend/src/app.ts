import dotenv from 'dotenv';

dotenv.config();

import express, { Application } from 'express';
import sequelize from './config/database';

import invoiceRoutes from './routes/invoiceRoutes';

const app: Application = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.use('/api', invoiceRoutes);

// Checking database...
sequelize.sync()
  .then(() => {
    console.info('Successfully connected to the database!');
  })
  .catch((err: any) => {
    console.error('Error connecting to the database:', err);
  });

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
});