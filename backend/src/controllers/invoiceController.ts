import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { InvoiceService } from "../services/InvoiceService";
import { PagBankOrderForm } from "../types";

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const service = new InvoiceService();

    const notificationURLs = ["https://example-fake.com/api/notifications"];

    const reference_id = uuidv4();

    const {
      value,
      currency,
      charge_description,
      due_date,
      client_id,
      items,
      shipping,
      instruction_line1,
      instruction_line2,
    } = req.body;

    // Builds a starting object to be complemented later.
    const invoiceCreationData = await service.buildInvoiceCreationData({
      reference_id,
      value,
      currency,
      description: charge_description,
      due_date: new Date(due_date),
      client_id,
      instruction_line1,
      instruction_line2,
    });

    // Complete data object to create a new invoice order.
    const invoiceData: PagBankOrderForm = {
      ...invoiceCreationData,
      items,
      shipping,
      notification_urls: notificationURLs
    }    
    
    // Registrate in the database.
    const invoice = await service.createInvoice(invoiceData);

    res.status(201).json({
      message: "Invoice successfully generated!",
      invoice: invoice,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Error generating new invoice: ${error.message}`
        : "Unknown error occurred while generating invoice.";

    return res.status(500).json({
      message: errorMessage,
      error: error,
    });
  }
};
