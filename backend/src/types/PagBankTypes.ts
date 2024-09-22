export interface PagBankOrderResponse {
  id: string;
  reference_id: string;
  created_at: string;
  customer: {
    name: string;
    email: string;
    tax_id: string;
    phone: Array<{
      country: number;
      area: number;
      number: number;
      type: "MOBILE" | "BUSINESS" | "HOME";
    }>;
  };
  items: Array<{
    reference_id: string;
    name: string;
    quantity: number;
    unit_amount: number;
  }>;
  shipping: {
    address: {
      street: string;
      number: string;
      complement: string;
      locality: string;
      city: string;
      region_code: string;
      country: string;
      postal_code: string;
    };
  };
  charges: [
    {
      id: string;
      reference_id: string;
      status:
        | "AUTHORIZED"
        | "PAID"
        | "IN_ANALISYS"
        | "DECLINED"
        | "CANCELED"
        | "WAITING";
      created_at: string;
      description: string;
      amount: {
        value: number;
        currency: string;
        summary: {
          total: number;
          paid: number;
          refunded: number;
        };
      };
      payment_response: {
        code: string;
        message: string;
      };
      payment_method: {
        type: "CREDIT_CARD" | "DEBIT_CARD" | "BOLETO" | "PIX";
        boleto: {
          id: string;
          barcode: string;
          formatted_barcode: string;
          due_date: string;
          instruction_lines: {
            line_1: string;
            line_2: string;
          };
          holder: {
            name: string;
            tax_id: string;
            email: string;
            address: {
              region: string;
              city: string;
              postal_code: string;
              street: string;
              number: string;
              locality: string;
              country: string;
              region_code: string;
            };
          };
        };
      };
      links: Array<{
        rel: string;
        href: string;
        media: string;
        type: string;
      }>;
    }
  ];
  notification_urls: string[];
  links: Array<{
    rel: string;
    href: string;
    media: string;
    type: string;
  }>;
}

export interface PagBankOrderForm {
  reference_id: string;
  customer: {
    name: string;
    email: string;
    tax_id: string;
    phone: Array<{
      country: number;
      area: number;
      number: number;
      type: "MOBILE" | "BUSINESS" | "HOME";
    }>;
  };
  items: Array<{
    name: string;
    quantity: number;
    unit_amount: number;
  }>;
  shipping: {
    address: {
      street: string;
      number: string;
      complement: string;
      locality: string;
      city: string;
      region_code: string;
      country: string;
      postal_code: string;
    };
  };
  charges: [
    {
      reference_id: string;
      description: string;
      amount: {
        value: number;
        currency: string;
      };
      payment_method: {
        type: "CREDIT_CARD" | "DEBIT_CARD" | "BOLETO" | "PIX";
        boleto: {
          due_date: string;
          instruction_lines: {
            line1: string;
            line2: string;
          };
          holder: {
            name: string;
            tax_id: string;
            email: string;
            address: {
              region: string;
              city: string;
              postal_code: string;
              street: string;
              number: string;
              locality: string;
              country: string;
              region_code: string;
            };
          };
        };
      };
    }
  ];
  notification_urls: string[];
}
