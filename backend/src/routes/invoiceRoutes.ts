import { Router } from 'express';
import { createInvoice } from '../controllers/invoiceController';
import { validateInvoiceCreation } from '../middlewares/validateInvoice';

const router = Router();

router.post('/invoices', validateInvoiceCreation, createInvoice);  
// router.get('/invoices', listInvoices);
// router.get('/invoices/:id', getInvoice); 

export default router;
