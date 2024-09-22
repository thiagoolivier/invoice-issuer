import axios, { AxiosError } from "axios";
import { InvoiceProviderInterface } from "../interfaces/InvoiceProviderInterface";
import { PagBankOrderForm, PagBankOrderResponse } from "../types";

export class PagBankProvider implements InvoiceProviderInterface {
  async generateInvoice(invoiceRequestData: PagBankOrderForm): Promise<PagBankOrderResponse> {
    const apiToken = process.env.INVOICE_API_TOKEN;
    const baseUrl = process.env.INVOICE_API_BASE_URL;

    try {
      const response = await axios.post(`${baseUrl}/orders`, invoiceRequestData, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      const invoice: PagBankOrderResponse = response.data;

      return invoice;      
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(`Error generating new invoice: ${e.message}`);
      } else {
        throw new Error('Unknown error occurred while generating invoice');
      }
    }
  }
}
