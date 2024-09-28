import { Router } from 'express';
import { createCustomer } from '../controllers/customerController';
import { validateCustomerCreation } from '../middlewares/validateCustomer';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/customers', authMiddleware, validateCustomerCreation, createCustomer);  
// router.get('/invoices', listInvoices);
// router.get('/invoices/:id', getInvoice); 

export default router;
