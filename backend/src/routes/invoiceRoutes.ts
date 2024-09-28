import { Router } from 'express';
import { createInvoice } from '../controllers/invoiceController';
import { validateInvoiceCreation } from '../middlewares/validateInvoice';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/invoices', authMiddleware, validateInvoiceCreation, createInvoice);  
// router.get('/invoices', listInvoices);
// router.get('/invoices/:id', getInvoice); 

export default router;
