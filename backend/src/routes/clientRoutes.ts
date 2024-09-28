import { Router } from 'express';
import { createClient } from '../controllers/clientController';
import { validateClientCreation } from '../middlewares/validateClient';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/clients', authMiddleware, validateClientCreation, createClient);  
// router.get('/invoices', listInvoices);
// router.get('/invoices/:id', getInvoice); 

export default router;
