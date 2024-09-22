import { PagBankOrderForm, PagBankOrderResponse } from "../types";

export interface InvoiceProviderInterface {
  generateInvoice(data: PagBankOrderForm): Promise<PagBankOrderResponse>;
}
