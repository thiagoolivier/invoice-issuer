import { Request, Response } from 'express';

export const createInvoice = (req: Request, res: Response) => {
  const { value, due_date } = req.body;

  // Setup integration...

  res.status(201).json({ message: 'Invoice successfully generated!' });
};

export const listInvoices = (req: Request, res: Response) => {
  // Logic here...

  res.status(200).json({ invoices: [] });
};

export const getInvoice = (req: Request, res: Response) => {
  const { id } = req.params;

  // Logic here...

  res.status(200).json({ invoice: {} });
};
