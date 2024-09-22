export interface InvoiceAttributes {
  id: number;
  barcode: string;
  formatted_barcode: string;
  due_date: Date;
  instruction_line1: string;
  instruction_line2: string;
  payment_method: string;
  value: number;
  currency: string;
  client_id: number;
  status: 
    | "AUTHORIZED"
    | "PAID"
    | "IN_ANALISYS"
    | "DECLINED"
    | "CANCELED"
    | "WAITING"; 
  reference_id: string;
  description: string;
  links: string;
}

export type InvoiceCreationAttributes = Omit<InvoiceAttributes, 'id'>;

export interface InvoiceForm extends InvoiceCreationAttributes {}
                    