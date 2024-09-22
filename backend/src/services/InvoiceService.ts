import { v4 as uuidv4 } from "uuid";
import Client from "../models/Client";
import Invoice from "../models/Invoice";
import {
  InvoiceAttributes,
  InvoiceCreationAttributes,
  PagBankOrderForm,
} from "../types";
import { InvoiceProviderFactory } from "./InvoiceProviderFactory";

// Types to be used in the class.
type InvoiceStatuses = InvoiceAttributes["status"];

export class InvoiceService {
  public async getInvoices(): Promise<Invoice[]> {
    const invoices = await Invoice.findAll();
    return invoices;
  }

  public async getInvoiceById(id: string): Promise<Invoice | null> {
    const invoice = await Invoice.findByPk(id);
    return invoice;
  }

  public async createInvoice(data: PagBankOrderForm): Promise<Invoice> {
    const provider = InvoiceProviderFactory.getProvider("pagbank");

    const invoiceData = await provider.generateInvoice(data);

    const client = await Client.findOne({
      where: { cpf_cnpj: invoiceData.customer.tax_id },
    });

    if (client === null) {
      throw new Error("Client not found");
    }

    const createdInvoice = await Invoice.create({
      payment_method: invoiceData.charges[0].payment_method.type,
      value: invoiceData.charges[0].amount.value,
      currency: invoiceData.charges[0].amount.currency,
      due_date: new Date(invoiceData.charges[0].payment_method.boleto.due_date),
      barcode: invoiceData.charges[0].payment_method.boleto.barcode,
      formatted_barcode: invoiceData.charges[0].payment_method.boleto.formatted_barcode,
      instruction_line1: invoiceData.charges[0].payment_method.boleto.instruction_lines.line_1,
      instruction_line2: invoiceData.charges[0].payment_method.boleto.instruction_lines.line_2,
      client_id: client.id,
      status: invoiceData.charges[0].status,
      reference_id: invoiceData.reference_id,
      description: invoiceData.charges[0].description,
      links: JSON.stringify(invoiceData.links),
    });

    return createdInvoice;
  }

  public async buildInvoiceCreationData({
    reference_id,
    value,
    currency,
    description,
    due_date,
    client_id,
    instruction_line1,
    instruction_line2,
  }: Omit<
    InvoiceCreationAttributes,
    "barcode" | "formatted_barcode" | "links" | "payment_method" | "status"
  >): Promise<Omit<PagBankOrderForm, "items" | "shipping" | "notification_urls">> {
    const customer = await Client.findByPk(client_id);

    if (customer === null) {
      throw new Error("Client not found in the database while building invoice creation data.");
    }

    return {
      reference_id,
      customer: {
        name: customer.name,
        email: customer.email,
        tax_id: customer.cpf_cnpj,
        phone: [
          {
            area: 69,
            country: 55,
            number: parseInt(customer.phone),
            type: "MOBILE",
          },
        ],
      },
      charges: [
        {
          reference_id: uuidv4(),
          description: description,
          amount: { value, currency },
          payment_method: {
            type: "BOLETO",
            boleto: {
              due_date: due_date.toISOString().split('T')[0],
              instruction_lines: {
                line1: instruction_line1,
                line2: instruction_line2,
              },
              holder: {
                name: customer.name,
                tax_id: customer.cpf_cnpj,
                email: customer.email,
                address: {
                  region: customer.address_region_code,
                  city: customer.address_city,
                  postal_code: customer.address_postal_code,
                  street: customer.address_street,
                  number: customer.address_number,
                  locality: customer.address_locality,
                  country: customer.address_country,
                  region_code: customer.address_region_code,
                },
              },
            },
          },
        },
      ],
    };
  }

  public async updateInvoiceStatus(
    id: string,
    status: InvoiceStatuses
  ): Promise<Invoice | null> {
    const invoice = await Invoice.findByPk(id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    invoice.status = status;
    await invoice.save();

    return invoice;
  }
}
