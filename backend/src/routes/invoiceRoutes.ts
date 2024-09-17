import { Router } from 'express';
import { createInvoice, listInvoices, getInvoice } from '../controllers/invoiceController';

const router = Router();

router.post('/invoices', createInvoice);  
router.get('/invoices', listInvoices);
router.get('/invoices/:id', getInvoice); 

export default router;
