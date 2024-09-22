import { Router } from 'express';
import { createClient } from '../controllers/clientController';
import { validateClientCreation } from '../middlewares/validateClient';

const router = Router();

router.post('/clients', validateClientCreation, createClient);  
// router.get('/invoices', listInvoices);
// router.get('/invoices/:id', getInvoice); 

export default router;
